// Camada de dados orientada a eventos. O Adobe Launch pode escutar adobeDataLayer.
(function (window, document) {
    "use strict";

    var STORAGE_KEY = "ecommerce_carrinho";
    var eventQueue = (window.adobeDataLayer = window.adobeDataLayer || []);
    window.digitalData = window.digitalData || {
        page: { pageInfo: {}, category: {} },
        traffic: {},
        user: { profileStatus: "deslogado", customerID: "" },
        search: { term: "", results: 0 },
        product: [],
        cart: { price: { cartTotal: "0.00" }, product: [] }
    };

    function readCart() {
        try {
            return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    function readUser() {
        var customerID = window.localStorage.getItem("ecommerce_customer_id") || "";
        return {
            profileStatus: customerID ? "logado" : "deslogado",
            customerID: customerID,
            name: window.localStorage.getItem("ecommerce_user_name") || "",
            email: window.localStorage.getItem("ecommerce_user_email") || ""
        };
    }

    function readPreferences() {
        try {
            return JSON.parse(window.localStorage.getItem("ecommerce_user_categories")) || [];
        } catch (error) {
            return [];
        }
    }

    function getTrafficContext() {
        var params = new URLSearchParams(window.location.search);
        return {
            source: params.get("utm_source") || "direto",
            medium: params.get("utm_medium") || "none",
            campaign: params.get("utm_campaign") || "none",
            ad: params.get("gclid") || params.get("ad_id") || "none",
            origin: params.get("traffic_origin") || "unknown",
            referrer: document.referrer || "none"
        };
    }

    function getProducts() {
        return Array.prototype.slice.call(document.querySelectorAll("[data-product-id]")).map(function (element) {
            return {
                productInfo: {
                    productID: element.dataset.productId,
                    productName: element.dataset.productName || element.textContent.trim(),
                    price: element.dataset.productPrice || "0.00"
                }
            };
        });
    }

    function cartContext(cart) {
        return {
            cartID: "cart_local",
            price: {
                cartTotal: cart.reduce(function (total, item) {
                    return total + Number(item.preco);
                }, 0).toFixed(2)
            },
            product: cart.map(function (item) {
                return { productInfo: { productID: item.id, productName: item.nome, price: Number(item.preco).toFixed(2) } };
            })
        };
    }

    function pushEvent(event, data) {
        var payload = Object.assign({ event: event }, data || {});
        eventQueue.push(payload);
        document.dispatchEvent(new CustomEvent("analytics:" + event, { detail: payload }));
    }

    function initialize() {
        var body = document.body;
        var pageType = body.dataset.pageType || "other";
        var pageName = body.dataset.pageName || document.title.toLowerCase();
        var cart = readCart();

        window.digitalData = {
            page: {
                pageInfo: { pageName: pageName, siteSection: "ecommerce", pageType: pageType },
                category: { pageType: pageType, primaryCategory: body.dataset.category || "" }
            },
            traffic: getTrafficContext(),
            user: readUser(),
            preferences: { categories: readPreferences() },
            search: { term: body.dataset.searchTerm || "", results: 0 },
            product: getProducts(),
            cart: cartContext(cart)
        };

        pushEvent("pageView", { page: window.digitalData.page, traffic: window.digitalData.traffic });

        document.addEventListener("click", function (event) {
            var target = event.target.closest("[data-analytics-click]");
            if (target) {
                pushEvent("click", { interaction: {
                    name: target.dataset.analyticsClick,
                    productID: target.dataset.productId || "",
                    component: target.dataset.analyticsComponent || "",
                    trafficOrigin: target.dataset.trafficOrigin || ""
                } });
            }
        });

        var search = document.querySelector("[data-analytics-search]");
        if (search) {
            search.addEventListener("search", function () {
                window.digitalData.search.term = search.value;
                pushEvent("search", { search: window.digitalData.search });
            });
        }
    }

    window.analyticsDataLayer = {
        push: pushEvent,
        refresh: function () {
            window.digitalData.user = readUser();
            window.digitalData.preferences = { categories: readPreferences() };
            window.digitalData.cart = cartContext(readCart());
            window.digitalData.product = getProducts();
        }
    };

    document.addEventListener("DOMContentLoaded", initialize);
})(window, document);