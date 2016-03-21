const ENTER_KEY_PRESSED = Symbol('ENTER key was pressed');
const KEY_EVENTS = {
    [ENTER_KEY_PRESSED]: 13
};

export default class CardController {
    constructor($timeout, $window, $http) {
        this.$timeout = $timeout;
        this.$window = $window;
        this.$http = $http;
        this.initialize();
    }

    initialize() {
        this.card = this.card || {
                products: [{}]
            };
        this.title = this.getTitle();
    }

    getItemsCount() {
        return this.cars.products.length;
    }

    getTotalPrice() {
        if (!this.card || !this.card.products) {
            return 0;
        }
        return this.card.products.reduce((prev, cur) => {
            return prev + cur.price * cur.quantity;
        }, 0);
    }

    getTitle() {
        return this.card.title;
    }

    onKeyPress($event, productIndex) {
        if ($event.which === KEY_EVENTS[ENTER_KEY_PRESSED]) {
            this.addProduct(productIndex)
                .then(response => this.setProductFocus(response.data.newProductId));
        }
    }

    saveCard($event) {
        if ($event.which === KEY_EVENTS[ENTER_KEY_PRESSED]) {
            return this.$http.post(`/card`, {
                title: this.card.title || new Date()
            }).then(response => {
                this.card = response.data;
            });
        }
    }

    addProduct(index) {
        return this.$http.post(`/card/${this.card._id}/addProduct`, {
            position: index,
            product: this.card.products[index]
        }).then(response => {
            this.card.products = response.data.products;
            return response;
        });
    }

    setProductFocus(productId) {
        this.$timeout(() => {
            let element = this.$window.document.getElementById(`card-product-${productId}`);
            if(element) {
                element.focus();
            }
        });
    }
}

CardController.$inject = ['$timeout', '$window', '$http'];