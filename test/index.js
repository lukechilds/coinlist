import test from 'ava';
import coins from 'this';

test('coins is an array', t => {
	t.true(Array.isArray(coins));
});

test('coins contains more than 0 coins', t => {
	t.true(coins.length > 0);
});

test('coin object has expected properties', t => {
	const expectedKeys = ['id', 'symbol', 'name', 'maxSupply'];
	const actualKeys = Object.keys(coins[0]);
	t.deepEqual(expectedKeys, actualKeys);
});

test('coins.get searches symbols', t => {
	const expectedBtc = {
		id: 'bitcoin',
		symbol: 'BTC',
		name: 'Bitcoin',
		maxSupply: 21000000
	};
	const actualBtc = coins.get('BTC');
	t.deepEqual(expectedBtc, actualBtc);
});

test('coins.get isn\'t case sensitive', t => {
	t.deepEqual(coins.get('BTC'), coins.get('btc'));
});

test('coins.get accepts a property argument', t => {
	const expectedName = 'Bitcoin';
	const actualName = coins.get('BTC', 'name');
	t.is(expectedName, actualName);
});

test('coins.get returns undefined if a coin doesn\'t exist', t => {
	t.is(coins.get('nonexistent'), undefined);
	t.is(coins.get('nonexistent', 'name'), undefined);
});

test('coins.get throws a TypeError on invalid property', t => {
	t.throws(() => coins.get('BTC', 'invalidprop'));
});
