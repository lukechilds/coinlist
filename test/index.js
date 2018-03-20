import test from 'ava';
import coins from '../';

test('coins is an array', t => {
	t.true(Array.isArray(coins));
});
