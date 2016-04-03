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
        return Card.find(params ? {actualDate: {$gt: params.startDate, $lt: params.endDate}} : {})
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

    function add(title, actualDate) {
        const card = new Card({
            title: title,
            actualDate: actualDate
        });
        card.products.push(new CardProduct());
        return card.save();
    }

    function update(data) {
        return getById(data.id, true)
            .then(card => {
                card.title = data.title || card.title;
                card.actualDate = data.actualDate || card.actualDate;
                return card;
            })
            .then(card => card.save());
    }

    return {
        get: get,
        getById: getById,
        add: add,
        update: update
    };
};
