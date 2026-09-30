# 🧪 Guia de Testes e Validação — Bugiganga Shop

Documento de apoio para testes locais, validação de envio de dados para o Adobe Analytics e construção de relatórios no Analysis Workspace.

---

## 📌 1. Credenciais & Contas de Teste

Para testar a identificação do visitante e associar a compra às variáveis `eVar2` / `eVar5` (`User ID`):


### E-mails Fictícios para Cadastro/Login:
1. `juliana.silva92@emailtest.com`
2. `marcos.vinicius.dev@testmail.org`
3. `carla.ferreira.poc@demo.net`
4. `lucas_mendes88@testlab.io`
5. `amanda.oliveira.qa@bugiganga.store`
6. `felipe.santos_test@mockmail.com`
7. `beatriz.costa2026@userdemo.com`
8. `rodrigo.almeida@testsuite.co`
9. `renata.lima.user@sandbox.org`
10. `diego.barros_dev@mailtest.net`
11. `patricia.martins@qacasting.com`
12. `gabriel.souza.shop@userpoc.io`
13. `fernanda.rocha99@dummymail.com`
14. `bruno.carvalho_qa@localtest.dev`
15. `vanessa.ribeiro@shopdemo.org`

---

## 🔗 2. URLs de Teste por Canal de Marketing (AQ-01 & AQ-02)

Utilize as URLs abaixo em **Janela Anónima** para testar a captura de `Tracking Code` (`eVar1`) e o correto enquadramento nos **Marketing Channels**:



* **Google Ads - Institucional / Marca:**
```text
http://localhost:5173/?cid=gads_search_brand_2026&utm_source=google&utm_medium=cpc&utm_campaign=gads_search_brand_2026

```


* **Google Ads - Categoria Eletrônicos:**
```text
http://localhost:5173/?cid=gads_search_eletronicos_2026&utm_source=google&utm_medium=cpc&utm_campaign=gads_search_eletronicos_2026

```


* **Bing / Microsoft Ads:**
```text
http://localhost:5173/?cid=bing_search_geral_2026&utm_source=bing&utm_medium=cpc&utm_campaign=bing_search_geral_2026

```


* **Meta Ads (Instagram Stories - Promoção):**
```text
http://localhost:5173/?cid=meta_ig_stories_blackfriday_2026&utm_source=instagram&utm_medium=paid_social&utm_campaign=meta_ig_stories_blackfriday_2026

```


* **Meta Ads (Facebook Feed - Retargeting):**
```text
http://localhost:5173/?cid=meta_fb_feed_retargeting_2026&utm_source=facebook&utm_medium=paid_social&utm_campaign=meta_fb_feed_retargeting_2026

```


* **TikTok Ads - Feed:**
```text
http://localhost:5173/?cid=tiktok_feed_promocao_2026&utm_source=tiktok&utm_medium=paid_social&utm_campaign=tiktok_feed_promocao_2026

```


* **Email - Newsletter Semanal:**
```text
http://localhost:5173/?cid=eml_newsletter_semana39_2026&utm_source=crm&utm_medium=email&utm_campaign=eml_newsletter_semana39_2026

```


* **Email - Carrinho Abandonado:**
```text
http://localhost:5173/?cid=eml_carrinho_abandonado_v1&utm_source=crm&utm_medium=email&utm_campaign=eml_carrinho_abandonado_v1

```


* **Display Programática (Google Display Network):**
```text
http://localhost:5173/?cid=gdn_banner_300x250_2026&utm_source=gdn&utm_medium=banner&utm_campaign=gdn_banner_300x250_2026

```


* **Portal de Notícias (Portal Parceiro):**
```text
http://localhost:5173/?cid=disp_portal_noticias_topo_2026&utm_source=portal_noticias&utm_medium=display&utm_campaign=disp_portal_noticias_topo_2026

```


* **Cupom / Afiliado:**
```text
http://localhost:5173/?cid=aff_mobi_cupom10_2026&utm_source=mobi&utm_medium=affiliate&utm_campaign=aff_mobi_cupom10_2026

```


* **Influenciador Youtube:**
```text
http://localhost:5173/?cid=inf_yt_tech_review_2026&utm_source=youtube&utm_medium=influencer&utm_campaign=inf_yt_tech_review_2026

```


