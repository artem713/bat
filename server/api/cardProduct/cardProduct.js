const mongoose = require('mongoose');

const cardProductSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    //card: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Card'
    //},
    price: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CardProduct', cardProductSchema);