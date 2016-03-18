'use strict';

const Product = require('./product');

class DbError extends Error {
    constructor(type, msg) {
        this.type = type;
        this.message = msg;
    }
}

module.exports = function ProductController() {
    function get() {
        return Product.find((err, data) => {
            if (err) {
                throw new Error('error while getting all products');
            }
            return data;
        });
    }

    function getProductByName(name) {
        return Product.findOne({name: name})
            .then((err, pr) => {
                if (err) {
                    console.log('Error while finding product:', err);
                }
                return pr;
            });
    }

    function getProductIdByName(name) {
        return getProductByName(name)
            .then(product => {
                if (!product) {
                    return null;
                    //throw new DbError(`PRODUCT_NOT_FOUND`, `Could not find product ${name}`);
                }
                return product._id;
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
        getProductByName: getProductByName,
        getProductIdByName: getProductIdByName,
        getCardProducts: getCardProducts
    };
};
