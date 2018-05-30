'use strict';

const got = require('got');
const writeJsonFile = require('write-json-file');

const jsonFile = 'src/coins.json';

(async () => {
	console.log(`Fetching latest currencies from the coinmarketcap.com API...`);
	const response = await got('https://api.coinmarketcap.com/v2/listings/', { json: true });
	const coins = response.body.data.map(coin => {
		const { id, symbol, name } = coin;

		return { id, symbol, name };
	});
	await writeJsonFile(jsonFile, coins);
	console.log(`Written ${coins.length} coins to ${jsonFile}`);
})();
