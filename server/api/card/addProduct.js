'use strict';

const CardController = require('./card.controller')(),
    ProductController = require('../product/product.controller')(),
    CardProduct = require('../cardProduct/cardProduct'),
    Product = require('../product/product');

let card = {};

module.exports = require('express').Router()
    .post('/:cardId/addProduct', addProduct);

function addProduct(req, res) {

    const {position, product: receivedCardProduct} = req.body;

    CardController.getById(req.params.cardId)
        .then(card => setCard(card))
        .then(() => modifyCardProduct(receivedCardProduct))
        .then(() => addNewCardProduct(position))
        .then(() => populateCard(req.params.cardId))
        .then(() => sendCardProducts(res, card.products));
}

function modifyCardProduct(data) {

    const cardProduct = card.products.id(data._id);

    cardProduct.price = data.price;
    cardProduct.quantity = data.quantity;

    if (!cardProduct.product) {
        return ProductController.getProductByName(data.product.name)
            .then(product => {
                if (product) {
                    cardProduct.product = product;
                    return cardProduct.save();
                }
                return new Product({name: data.product.name})
                    .save()
                    .then(product => {
                        cardProduct.product = product;
                        return cardProduct.save();
                    });

            });
    }
}

function addNewCardProduct(position) {
    card.products.splice(position + 1, 0, new CardProduct());
    return card.save();
}

function populateCard(id) {
    return CardController
        .getById(id, true)
        .then(card => setCard(card));
}

function setCard(data) {
    card = data;
}

function sendCardProducts(response, products) {
    response.send({products: products});
}
