# coinlist

> Comprehensive list of cryptocurrencies with metadata

[![Build Status](https://travis-ci.org/lukechilds/coinlist.svg?branch=master)](https://travis-ci.org/lukechilds/coinlist)
[![Coverage Status](https://coveralls.io/repos/github/lukechilds/coinlist/badge.svg?branch=master)](https://coveralls.io/github/lukechilds/coinlist?branch=master)
[![npm](https://img.shields.io/npm/v/coinlist.svg)](https://www.npmjs.com/package/coinlist)

List compiled from the coinmarketcap.com API. Importable as a raw JSON file or an array with helper methods.

## Install

```shell
yarn add coinlist
```

## Usage

```js
const coins = require('coinlist');

// coins is an array of coin objects:
[
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    maxSupply: 21000000
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    maxSupply: null
  },
  ...
]

// There is a useful helper method to search the array for a ticker symbol:
const btc = coins.get('BTC');
{
  id: 'bitcoin',
  symbol: 'BTC',
  name: 'Bitcoin',
  maxSupply: 21000000
}

// Or get a specific property
coins.get('BTC', 'name');
// "Bitcoin"
coins.get('BTC', 'maxSupply');
// 21000000

// You can still use all the usual array methods on coins:
coins.filter(coin => coin.maxSupply > 10000000000).map(coin => coin.name);
[
  'Ripple',
  'Cardano',
  ...
]

// Alternatively, you can load the raw JSON file:
const coinsJson = require('coinlist/src/coins.json');
```

## API

### coins

An array of coin objects.

### coins.get(symbol, [property])

Returns a coin object.

Alternatively returns a coin property if the `property` argument is defined.

If the symbol cannot be found it will return `undefined`.

#### symbol

Type: `string`

The coin ticker symbol to search the array for.

#### property

Type: `string`

A single coin property to return instead of the entire coin object.

Valid properties are:

- `id` The CoinMarketCap API id.
- `symbol` The ticker symbol.
- `name` The readable name.
- `maxSupply` The maximum supply of units.

## Update Coins

```
coinlist $ yarn update
Fetching latest currencies from the coinmarketcap.com API...
Written 1567 coins to src/coins.json
✨ Done in 0.52s.
```

## Contributing

Pull requests are welcome to improve the code but please don't add currencies to `coins.json` directly. The JSON is automatically generated from the update script.

## License

MIT © Luke Childs
