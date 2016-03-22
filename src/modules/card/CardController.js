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
        this._timeout = null;
        this.card.actualDate = new Date(this.card.actualDate);
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
            const currentDate = new Date();
            return this.$http.post(`/card`, {
                title: this.card.title || `Unknown shop at ${currentDate}`,
                actualDate: this.card.actualDate || currentDate
            }).then(response => {
                this.card = response.data;
            });
        }
    }

    updateCardInfo() {
        console.log('updating card info');
        let promise = this.$http.put(`/card/${this.card._id}`, {
            title: this.card.title,
            actualDate: this.card.actualDate
        }).then(response => {
            this.card = response.data;
            this.initialize();
            if (this._timeout) {
                console.log('cancelling timeout');
                this.$timeout.cancel(this._timeout);
            }
        });
        return promise;
    }

    _deferedUpdatingCardInfo() {
        if (!this._timeout) {
            this._timeout = this.$timeout(() => this.updateCardInfo(), 3000);
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
            if (element) {
                element.focus();
            }
        });
    }
}

CardController.$inject = ['$timeout', '$window', '$http'];