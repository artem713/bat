'use strict';

const CardController = require('./card.controller')(),
    Card = require('./card'),
    Product = require('../product/product'),
    CardProduct = require('../cardProduct/cardProduct');

module.exports = require('express').Router()
    .post('/:cardId/addProduct', function (req, res) {
        const position = req.body.position;
        const cardProduct = req.body.product;

        Card.findById((req.params.cardId))
            .exec((err, card) => {
                if (err) {
                    console.log(err);
                }
                return card;
            })
            .then(card => {
                var doc = card.products.id(cardProduct._id);
                if (doc) {
                    doc.price = cardProduct.price;
                    doc.quantity = cardProduct.quantity;
                    return card.save();
                } else {
                    return Product.findOne({name: cardProduct.product.name})
                        .then((err, pr) => {
                            if (err) {
                                console.log('Error while finding product:', err);
                            }
                            return pr;
                        })
                        .then(pr => {
                            let cp = new CardProduct({
                                product: pr._id,
                                price: cardProduct.price,
                                quantity: cardProduct.quantity
                            });
                            card.products.splice(position, 0, cp);
                            return card.save();
                        });
                }
            })
            .then(card => {
                card.products.splice(position + 1, 0, new CardProduct());
                return card.save();
            })
            .then(card => {
                return Card.findById((req.params.cardId)).populate({
                        path: 'products',
                        model: 'CardProduct',
                        populate: {
                            path: 'product',
                            model: 'Product',
                            select: 'name'
                        }
                    })
                    .exec((err, data) => data);
            })
            .then(card => res.send({products: card.products}));
    });