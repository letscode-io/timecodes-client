const { humanizeTime } = require("./humanizeTime");

test("returns 00:00", () => {
  expect(humanizeTime(0)).toBe("00:00");
});

test("returns 00:11", () => {
  expect(humanizeTime(11)).toBe("00:11");
});

test("returns 00:11", () => {
  expect(humanizeTime(11)).toBe("00:11");
});

test("returns 01:00", () => {
  expect(humanizeTime(60)).toBe("01:00");
});

test("returns 01:37", () => {
  expect(humanizeTime(97)).toBe("01:37");
});

test("returns 04:57", () => {
  expect(humanizeTime(297)).toBe("04:57");
});

test("returns 09:31:37", () => {
  expect(humanizeTime(34297)).toBe("09:31:37");
});

test("returns 259:31:37", () => {
  expect(humanizeTime(934297)).toBe("259:31:37");
});
