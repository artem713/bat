'use strict';

const Card = require('./card'),
    Product = require('../product/product'),
    CardProduct = require('../cardProduct/cardProduct');

module.exports = function CardController() {
    function get() {
        return _find();
    }

    function getById(id) {
        return _find({_id: id});
    }

    function _find(params) {
        return Card.find(params || {})
            .populate({
                path: 'products',
                model: 'CardProduct',
                populate: {
                    path: 'product',
                    model: 'Product',
                    select: 'name'
                }
            })
            .exec((err, data) => data);
    }

    return {
        get: get,
        getById: getById
    };
};
