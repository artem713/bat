//const express = require('express'),
//    cardListData = require('./cardList.data'),
//    card = express();
//
//module.exports = card.post('/:id/addProduct/:index', (req, res) => {
//    console.log(req.params);
//    var card = cardListData.find(item => {
//        return item.id.toString() === req.params.id;
//    });
//    card.products.splice(req.params.index, 0, {
//        price: 100,
//        quantaty: 3,
//        title: 'NEW PRODUCT'
//    });
//    res.send(card);
//});
