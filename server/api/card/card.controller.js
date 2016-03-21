'use strict';

const Card = require('./card'),
    Product = require('../product/product'),
    CardProduct = require('../cardProduct/cardProduct'),
    populationConfig = {
        path: 'products',
        model: 'CardProduct',
        populate: {
            path: 'product',
            model: 'Product',
            select: 'name'
        }
    };

module.exports = function CardController() {

    function get(params) {
        return Card.find(params || {})
            .populate(populationConfig)
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                }
                return data;
            });
    }

    function getById(id, populate) {
        let promise = Card.findById(id);
        promise = populate ? promise.populate(populationConfig) : promise;

        return promise.exec((err, data) => {
            if (err) {
                console.log(err);
            }
            return data;
        });
    }

    return {
        get: get,
        getById: getById
    };
};
