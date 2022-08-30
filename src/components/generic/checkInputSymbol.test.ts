import func from "./checkInputSymbol";

describe("validate input value", () => {
  test("only numbers", () => {
    expect(func("145")).toBe(true);
  });
  test("with one dot", () => {
    expect(func("14.5")).toBe(true);
  });
  test("symbol minus", () => {
    expect(func("-")).toBe(false);
  });
  test("with two dots", () => {
    expect(func("14.5.1")).toBe(false);
  });
  test("letter", () => {
    expect(func("y")).toBe(false);
  });
  test("more than 999999", () => {
    expect(func("1000002")).toBe(false);
  });
  test("less than 0.000001", () => {
    expect(func("0.0000001")).toBe(false);
  });
});
