const { queryParamsFromObject } = require('./queryParamsFromObject');

test('returns empty string', () => {
  expect(queryParamsFromObject({})).toBe('');
});

test('returns query params string', () => {
  const params = {
    q: 'search',
    num: 5,
    bool: false,
    undefined: undefined,
    null: null
  };
  expect(queryParamsFromObject(params)).toBe('q=search&num=5&bool=false&undefined=undefined&null=null');
});
