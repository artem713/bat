const mongoose = require('mongoose'),
    CardProduct = require('../cardProduct/cardProduct');

const cardSchema = mongoose.Schema({
    title: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    },
    products: [CardProduct.schema]
});

module.exports = mongoose.model('Card', cardSchema);