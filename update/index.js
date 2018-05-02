'use strict';

const got = require('got');
const writeJsonFile = require('write-json-file');

const jsonFile = 'src/coins.json';

const getCoins = () => {
	const MAX_ITEMS_PER_PAGE = 100;

	const fetch = async (start = 1, coins = []) => {
		const url = `https://api.coinmarketcap.com/v2/ticker/?limit=0&start=${start}`;
		const { body } = await got(url, {
			json: true,
			throwHttpErrors: false
		});

		if (body.data !== null) {
			return fetch(start + MAX_ITEMS_PER_PAGE, [...coins, ...Object.values(body.data)]);
		}

		const { error } = body.status;
		if (error && error !== 'id not found') {
			throw new Error(error);
		}

		return coins;
	};

	return fetch();
};

(async () => {
	console.log(`Fetching latest currencies from the coinmarketcap.com API...`);

	const coins = (await getCoins())
		.map(coin => ({
			id: coin.id,
			symbol: coin.symbol,
			name: coin.name,
			maxSupply: Number.parseFloat(coin.max_supply)
		}))
		.sort((a, b) => a.id - b.id);

	await writeJsonFile(jsonFile, coins);
	console.log(`Written ${coins.length} coins to ${jsonFile}`);
})();
