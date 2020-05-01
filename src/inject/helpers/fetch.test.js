const { fetch } = require('./fetch');

function mockResponseWith(fakeResponse) {
  return jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(fakeResponse)
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
    window.fetch = mockResponseWith({ success: true });
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

test.todo('reject window.fetch')
test.todo('if returns status not in 200-299 reject')
test.todo('POST should stringify data')
test.todo('GET ignore data param')
