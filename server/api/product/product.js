const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: String
});

module.exports = mongoose.model('Product', productSchema);