const mongoose = require('mongoose');

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
    products: ['CardProduct']
});

module.exports = mongoose.model('Card', cardSchema);