'use strict';

const coins = require('./coins.json');

coins.get = symbol => coins.find(coin => coin.symbol.toUpperCase() === symbol.toUpperCase());

module.exports = coins;
