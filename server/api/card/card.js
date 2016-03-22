const mongoose = require('mongoose'),
    CardProduct = require('../cardProduct/cardProduct'),
    dateDefaults = {
        type: Date,
        default: Date.now
    },
    cardSchema = mongoose.Schema({
        title: String,
        createdOn: dateDefaults,
        modifiedOn: dateDefaults,
        actualDate: dateDefaults,
        products: [CardProduct.schema]
    });

module.exports = mongoose.model('Card', cardSchema);