var app = new Vue({
    el: '#app',
    data: {
        products: [
            {id: 1, title: 'мандарин сацума', short_text: 'сладкий и без косточек', image: 'img/m1.jpg', desc: 'сорт сацума ценится за тонкую кожуру и отсутствие семян. идеально для детей.'},
            {id: 2, title: 'мандарин клементин', short_text: 'сочный гибрид', image: 'img/m2.jpg', desc: 'клементины — самые сладкие мандарины в сезоне, гибрид с апельсином.'},
            {id: 3, title: 'мандарин танжерин', short_text: 'яркий аромат', image: 'img/m3.jpg', desc: 'танжерины имеют темную кожуру и насыщенный терпкий вкус.'},
            {id: 4, title: 'мандарин минеола', short_text: 'форма колокольчика', image: 'img/m4.jpg', desc: 'необычный гибрид с легкой кислинкой и очень тонкой кожей.'},
            {id: 5, title: 'мандарин уншиу', short_text: 'классический сорт', image: 'img/m5.jpg', desc: 'традиционный новогодний мандарин, очень сочный и сладкий.'}
        ],
        product: {}, 
        btnVisible: 0, 
        

        cart: [], 
        contactFields: { 
            name: '', company: '', position: '', city: '',
            country: '', phone: '', email: '', role: 'seed-producer',
            other_role: '', interested_in: ''
        },
        orderSubmitted: false 
    },
    mounted: function() {
        this.getProduct();
        this.checkInCart();
        this.getCart(); 
    },
    methods: {
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
        addToCart: function(id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join(','));
                this.btnVisible = 1;
                this.getCart(); 
            }
        },
        checkInCart: function() {
            if (this.product && this.product.id && window.localStorage.getItem('cart')) {
                var cart = window.localStorage.getItem('cart').split(',');
                if (cart.indexOf(String(this.product.id)) != -1) {
                    this.btnVisible = 1;
                }
            }
        },
        

        getCart: function() {
            var localCart = window.localStorage.getItem('cart');
            this.cart = []; 
            if (localCart) {
                var ids = localCart.split(',');
                for (var i = 0; i < ids.length; i++) {
                    for (var j = 0; j < this.products.length; j++) {
                        if (this.products[j].id == ids[i]) {
                            this.cart.push(this.products[j]);
                        }
                    }
                }
            }
        },
        

        removeFromCart: function(id) {
            this.cart = this.cart.filter(item => item.id != id);
            
            var ids = this.cart.map(item => item.id);
            if (ids.length > 0) {
                window.localStorage.setItem('cart', ids.join(','));
            } else {
                window.localStorage.removeItem('cart');
            }
            
            if (this.product.id == id) {
                this.btnVisible = 0;
            }
        },
        

        makeOrder: function() {
            this.orderSubmitted = true;
            this.cart = []; 
            window.localStorage.removeItem('cart'); 
        }
    }
});