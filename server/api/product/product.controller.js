'use strict';

const Product = require('./product');

module.exports = function ProductController() {
    function get() {
        return Product.find((err, data) => {
            if (err) {
                throw new Error('error while getting all products');
            }
            return data;
        });
    }

    function getCardProducts(card) {
        console.log(`finding products for card ${card._id}`);

        return Product.find({title: 'Bread'}, (err, data) => {
            if (err) {
                console.log(err);
                throw new Error('error while getting cards products');
            }
            console.log(`found ${data.length} products`);
            card['products'] = data;
            return card;
        });
    }

    return {
        get: get,
        getCardProducts: getCardProducts
    };
};
