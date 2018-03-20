'use strict';

const coins = require('./coins.json');

coins.get = (symbol, prop) => {
	const coin = coins.find(coin => coin.symbol.toUpperCase() === symbol.toUpperCase());

	if (typeof prop === 'undefined' || typeof coin === 'undefined') {
		return coin;
	}

	const value = coin[prop];

	if (typeof value === 'undefined') {
		throw new TypeError(`Invalid property: ${prop}`);
	}

	return value;
};

module.exports = coins;
