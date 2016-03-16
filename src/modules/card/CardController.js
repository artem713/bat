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
        return this.card.title || this.card.date ? new Date(this.card.date).toDateString() : new Date().toDateString();
    }

    onKeyPress($event, productIndex) {
        if ($event.which === KEY_EVENTS[ENTER_KEY_PRESSED]) {
            this.addProduct(productIndex + 1);
            this.setFocus(productIndex + 1)
        }
    }

    addProduct(index) {
        if (!this.card.id) {
            this.$http.post(`/card/add`);
        }
        return this.$http.post(`/card/${this.card.id}/addProduct/${index}`).then((response) => {
            this.card.products = response.data.products;
        });
    }

    setFocus(index) {
        this.$timeout(() => {
            let element = this.$window.document.getElementById(`card-product-${index}`);
            if(element) {
                element.focus();
            }
        });
    }
}

CardController.$inject = ['$timeout', '$window', '$http'];