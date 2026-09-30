(function (window) {
  "use strict";

  window.productService = {
    getAll: function () {
      return [
        { id: "123", name: "Mochila de Entrega Profissional", price: "150,00", categories: ["viagem", "esportes"], image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80" },
        { id: "456", name: "Capacete de Moto Articulado", price: "320,00", categories: ["automotivo", "esportes"], image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80" },
        { id: "789", name: "Fone Bluetooth Compacto", price: "89,90", categories: ["eletronicos"], image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80" },
        { id: "790", name: "Luminária de Mesa LED", price: "119,90", categories: ["casa", "eletronicos"], image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80" },
        { id: "791", name: "Tênis Urbano Casual", price: "199,90", categories: ["moda", "esportes"], image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80" },
        { id: "792", name: "Garrafa Térmica Esportiva", price: "59,90", categories: ["esportes", "viagem"], image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80" },
        { id: "793", name: "Kit de Ferramentas 32 Peças", price: "249,90", categories: ["ferramentas", "casa"], image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=700&q=80" },
        { id: "794", name: "Cafeteira Elétrica", price: "179,90", categories: ["casa", "eletronicos"], image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=700&q=80" },
        { id: "795", name: "Mala de Viagem Expansível", price: "289,90", categories: ["viagem"], image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=700&q=80" },
        { id: "796", name: "Câmera Instantânea", price: "399,90", categories: ["eletronicos"], image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80" },
        { id: "797", name: "Mochila para Notebook", price: "139,90", categories: ["eletronicos", "viagem"], image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80" },
        { id: "798", name: "Caixa de Som Portátil", price: "229,90", categories: ["eletronicos", "casa"], image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80" },
        { id: "799", name: "Jaqueta Urbana", price: "259,90", categories: ["moda"], image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80" },
        { id: "800", name: "Bolsa Transversal", price: "129,90", categories: ["moda"], image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80" },
        { id: "801", name: "Secador de Cabelos", price: "149,90", categories: ["beleza"], image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=700&q=80" },
        { id: "802", name: "Kit de Cuidados para Pele", price: "99,90", categories: ["beleza"], image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80" },
        { id: "803", name: "Perfume Essencial", price: "189,90", categories: ["beleza"], image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80" },
        { id: "804", name: "Livro de Aventuras", price: "49,90", categories: ["livros"], image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80" },
        { id: "805", name: "Caderno Criativo", price: "34,90", categories: ["livros"], image: "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=700&q=80" },
        { id: "806", name: "Canetas Coloridas", price: "24,90", categories: ["livros"], image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80" },
        { id: "807", name: "Furadeira Compacta", price: "299,90", categories: ["ferramentas"], image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80" },
        { id: "808", name: "Alicate Multiuso", price: "79,90", categories: ["ferramentas"], image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=80" },
        { id: "809", name: "Blocos de Montar", price: "119,90", categories: ["brinquedos"], image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=80" },
        { id: "810", name: "Quebra-cabeça Criativo", price: "69,90", categories: ["brinquedos"], image: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&w=700&q=80" },
        { id: "811", name: "Jogo de Cartas", price: "39,90", categories: ["brinquedos"], image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=700&q=80" },
        { id: "812", name: "Cama Macia para Pet", price: "159,90", categories: ["pet"], image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=80" },
        { id: "813", name: "Brinquedo para Cachorro", price: "44,90", categories: ["pet"], image: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=700&q=80" },
        { id: "814", name: "Comedouro Inteligente", price: "89,90", categories: ["pet"], image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=80" },
        { id: "815", name: "Capa para Banco Automotivo", price: "139,90", categories: ["automotivo"], image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=700&q=80" },
        { id: "816", name: "Organizador para Carro", price: "69,90", categories: ["automotivo"], image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80" },
        { id: "817", name: "Ukulele Acústico", price: "349,90", categories: ["instrumentos"], image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=700&q=80" },
        { id: "818", name: "Teclado Musical", price: "599,90", categories: ["instrumentos"], image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=700&q=80" },
        { id: "819", name: "Microfone de Estúdio", price: "279,90", categories: ["instrumentos"], image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80" }
      ];
    },
    getRecommended: function (categories) {
      var selected = categories || [];
      if (!selected.length) return this.getAll();
      return this.getAll().filter(function (product) {
        return product.categories.some(function (category) {
          return selected.indexOf(category) !== -1;
        });
      });
    }
  };
})(window);