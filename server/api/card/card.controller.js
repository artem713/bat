'use strict';

const Card = require('./card'),
    Product = require('../product/product'),
    CardProduct = require('../cardProduct/cardProduct');

module.exports = function CardController() {
    function get() {

        return Card.find({})
            .populate({
                path: 'products',
                model: 'CardProduct',
                populate: {
                    path: 'product',
                    model: 'Product',
                    select: 'name'
                }
            })
            .exec(function (err, a) {
                console.log(a);
                return a;
            });
    }

    return {
        get: get
    };
};
