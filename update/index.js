'use strict';

const got = require('got');
const writeJsonFile = require('write-json-file');

const jsonFile = 'src/coins.json';

(async () => {
	console.log(`Fetching latest currencies from the coingecko.com API...`);
	const response = await got('https://api.coingecko.com/api/v3/coins/list', { json: true });
	const coins = response.body
		.map(coin => ({
			id: coin.id,
			symbol: coin.symbol.toUpperCase(),
			name: coin.name
		}))
		.sort((a, b) => a.id.localeCompare(b.id));
	await writeJsonFile(jsonFile, coins);
	console.log(`Written ${coins.length} coins to ${jsonFile}`);
})();
