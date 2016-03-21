'use strict';

const CardController = require('./card.controller')(),
    ProductController = require('../product/product.controller')(),
    CardProduct = require('../cardProduct/cardProduct'),
    Product = require('../product/product');

module.exports = require('express').Router()
    .post('/:cardId/addProduct', addProduct);

function addProduct(req, res) {

    const {position, product: receivedCardProduct} = req.body;

    CardController.getById(req.params.cardId)
        .then(card => {
            const cardProduct = card.products.id(receivedCardProduct._id);
            return modifyCardProduct(cardProduct, receivedCardProduct)
                .then(() => {
                    return card;
                });
        })
        .then(card => {
            card.products.splice(position + 1, 0, new CardProduct());
            return card.save();
        })
        .then(() => CardController.getById(req.params.cardId, true))
        .then(card => res.send({products: card.products}));
}

function modifyCardProduct(cardProduct, data) {

    cardProduct.price = data.price;
    cardProduct.quantity = data.quantity;

    if (!cardProduct.product) {
        return ProductController.getProductByName(data.product.name)
            .then(product => {
                if (product) {
                    cardProduct.product = product;
                    return cardProduct.save();
                } else {
                    return new Product({name: data.product.name})
                        .save()
                        .then(product => {
                            cardProduct.product = product;
                            return cardProduct.save();
                        });
                }
            });
    }
    //return q.promise;
}

