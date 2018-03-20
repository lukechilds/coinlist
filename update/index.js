'use strict';

const got = require('got');
const writeJsonFile = require('write-json-file');

const jsonFile = 'src/coins.json';

(async () => {
	console.log(`Fetching data...`);
	const response = await got('https://api.coinmarketcap.com/v1/ticker/?limit=0', { json: true });
	const coins = response.body
		.map(coin => ({
			id: coin.id,
			symbol: coin.symbol,
			name: coin.name,
			maxSupply: parseFloat(coin.max_supply)
		}))
		.sort((a, b) => a.id.localeCompare(b.id));
	await writeJsonFile(jsonFile, coins);
	console.log(`Written ${coins.length} coins to ${jsonFile}`);
})();
