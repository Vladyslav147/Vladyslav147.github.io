var app = new Vue({
    el: '#app',
    data: {
        // пункт 4-5: 
        products: [
            {id: 1, title: 'мандарин сацума', short_text: 'сладкий и без косточек', image: 'img/m1.jpg', desc: 'сорт сацума ценится за тонкую кожуру и отсутствие семян. идеально для детей.'},
            {id: 2, title: 'мандарин клементин', short_text: 'сочный гибрид', image: 'img/m2.jpg', desc: 'клементины — самые сладкие мандарины в сезоне, гибрид с апельсином.'},
            {id: 3, title: 'мандарин танжерин', short_text: 'яркий аромат', image: 'img/m3.jpg', desc: 'танжерины имеют темную кожуру и насыщенный терпкий вкус.'},
            {id: 4, title: 'мандарин минеола', short_text: 'форма колокольчика', image: 'img/m4.jpg', desc: 'необычный гибрид с легкой кислинкой и очень тонкой кожей.'},
            {id: 5, title: 'мандарин уншиу', short_text: 'классический сорт', image: 'img/m5.jpg', desc: 'традиционный новогодний мандарин, очень сочный и сладкий.'}
        ],
        product: {}, // пункт 15: 
        btnVisible: 0 // пункт 15: 
    },
    mounted: function() {
        // пункт 18 і 26: 
        this.getProduct();
        this.checkInCart();
    },
    methods: {
        // пункт 17:
        getProduct: function() {
            var id = window.location.hash.replace('#', '');
            if (this.products && this.products.length > 0) {
                for (var i in this.products) {
                    if (this.products[i].id == id) {
                        this.product = this.products[i];
                    }
                }
            }
        },
        // пункт 21: 
        addToCart: function(id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join(','));
                this.btnVisible = 1;
            }
        },
        // пункт 25: 
        checkInCart: function() {
            if (this.product && this.product.id && window.localStorage.getItem('cart')) {
                var cart = window.localStorage.getItem('cart').split(',');
                if (cart.indexOf(String(this.product.id)) != -1) {
                    this.btnVisible = 1;
                }
            }
        }
    }
});