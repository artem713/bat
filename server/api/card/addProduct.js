'use strict';

const CardController = require('./card.controller')(),
    Card = require('./card'),
    Product = require('../product/product'),
    ProductController = require('../product/product.controller')(),
    CardProduct = require('../cardProduct/cardProduct');

module.exports = require('express').Router()
    .post('/:cardId/addProduct', function (req, res) {
        const position = req.body.position;
        const cardProduct = req.body.product;

        CardController.getById(req.params.cardId)
            .then(card => {
                var doc = card.products.id(cardProduct._id);
                if (doc) {
                    doc.price = cardProduct.price;
                    doc.quantity = cardProduct.quantity;
                    if (!doc.product) {
                        return ProductController.getProductIdByName(cardProduct.product.name)
                            .then(productId => {
                                if (productId) {
                                    doc.product = new mongoose.Types.ObjectId(productId);
                                } else {
                                    let newProduct = new Product({name: cardProduct.product.name});
                                    return newProduct.save().then(pr => {
                                        doc.product = pr;
                                        doc.save();
                                    });
                                }
                                return doc.save();
                            })
                            .then(() => card.save());
                    }
                    return card.save();
                } else {
                    return ProductController.getProductIdByName(cardProduct.product.name)
                        .then(productId => {
                            let newCardProduct = new CardProduct({
                                product: productId._id,
                                price: cardProduct.price,
                                quantity: cardProduct.quantity
                            });
                            card.products.splice(position, 0, newCardProduct);
                            return card.save();
                        });
                }
            })
            .then(card => {
                card.products.splice(position + 1, 0, new CardProduct());
                return card.save();
            })
            .then(() => CardController.getById(req.params.cardId, true))
            .then(card => res.send({products: card.products}));
    });