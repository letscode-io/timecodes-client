const { fetch } = require("./fetch");

function mockResponseWith(fakeResponse, ok = true) {
  return jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(fakeResponse),
    })
  );
}

test("fetch has get method", () => {
  expect(fetch).toHaveProperty("get");
});

test("fetch has post method", () => {
  expect(fetch).toHaveProperty("post");
});

describe("URL", () => {
  beforeEach(() => {
    window.fetch = mockResponseWith({ success: true });
  });

  test("starts with HOST", async () => {
    await fetch.get("/timecodes");
    const { calls } = window.fetch.mock;
    const [url] = calls[calls.length - 1];

    expect(url).toBe("https://example.com/timecodes");
  });

  test("remains as is", async () => {
    await fetch.get("https://site.com/timecodes");
    const { calls } = window.fetch.mock;
    const [url] = calls[calls.length - 1];

    expect(url).toBe("https://site.com/timecodes");
  });

  test("appears query params", async () => {
    await fetch.get("/timecodes", { query: "param" });
    const { calls } = window.fetch.mock;
    const [url] = calls[calls.length - 1];

    expect(url).toBe("https://example.com/timecodes?query=param");
  });
});

describe("request", () => {
  beforeEach(() => {
    window.fetch = mockResponseWith({ success: true });
  });

  test("POST should stringify body", async () => {
    await fetch.post("/timecodes", { query: "param" });
    const { calls } = window.fetch.mock;
    const [, options] = calls[calls.length - 1];

    expect(options.body).toBe('{"query":"param"}');
  });

  test("has Content-Type header", async () => {
    await fetch.post("/timecodes", { query: "param" });
    const { calls } = window.fetch.mock;
    const [, options] = calls[calls.length - 1];

    expect(options.headers).toHaveProperty("Content-Type", "application/json");
  });
});

describe("response", () => {
  beforeEach(() => {
    window.fetch = mockResponseWith({ any: "body" }, false);
  });

  test("throw an error with response if status no in 200-299", async () => {
    try {
      await fetch.post("/timecodes", { query: "param" });
    } catch (error) {
      expect(error.ok).toBe(false);
    }
  });
});
