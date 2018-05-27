import { separateByComma } from "../../formatter";

describe("separateByComma()", function() {
  it("returns from number", () => {
    const expected = "25,000";
    const result = separateByComma(25000);

    expect(result).toEqual(expected);
  });

  it("returns from string", () => {
    const expected = "25,000";
    const result = separateByComma("25000");

    expect(result).toEqual(expected);
  });
});
