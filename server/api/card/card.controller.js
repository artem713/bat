'use strict';

const Card = require('./card'),
    ProductController = require('../product/product.controller')(),
    Product = require('../product/product'),
    CardProduct = require('../cardProduct/cardProduct'),
    q = require('q');

module.exports = function CardController() {
    function get() {

        /*let pr = Card.find()
         .then(cards => {
         let promise = Card
         .populate(cards, {
         path: 'products',
         select: 'quantity price',
         populate: {
         path: 'products',
         model: 'Product'
         }
         })
         .then(res => {
         console.log(res);
         return res;
         })
         .end();
         return q.when(promise);
         });*/

        let pr = Card.find({})
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

        return q.when(pr);
    }

    function _getCardProducts(card) {
        return ProductController.getCardProducts(card)
            .then(data => data)
            .catch(err => {
                console.error(`error while fetching card (_id: ${card._id}) products`);
                return [];
            });
    }

    return {
        get: get
    };
};
