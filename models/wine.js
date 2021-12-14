const mongoose = require('mongoose');
const config = require('config');

const wineSchema = new mongoose.Schema({
    vineyard: {type: String, required: true},
    varietal: {type: String, required: true},
    pairing: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});

const Wine = mongoose.model('Wine', wineSchema);
module.exports.Wine = Wine;
module.exports.wineSchema = wineSchema;