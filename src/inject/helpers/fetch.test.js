const { fetch } = require('./fetch');

function mockResponseWith(fakeResponse) {
  return jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(response)
  }))
}

test('fetch has get method', () => {
  expect(fetch).toHaveProperty('get');
});

test('fetch has post method', () => {
  expect(fetch).toHaveProperty('post');
});

describe('URL', () => {
  beforeEach(() => {
    mockResponseWith({ success: true });
  });

  test('starts with HOST', async () => {
    await fetch.get('/timecodes');
    const { calls } = window.fetch.mock;
    const [ url ] = calls[calls.length - 1];

    expect(url).toBe('https://example.com/timecodes')
  });

  test('remains as is', async () => {
    await fetch.get('https://site.com/timecodes');
    const { calls } = window.fetch.mock;
    const [ url ] = calls[calls.length - 1];

    expect(url).toBe('https://site.com/timecodes')
  });
});

test.skip('reject window.fetch')
test.skip('if returns status not in 200-299 reject')
test.skip('POST should stringify data')
test.skip('GET ignore data param')
