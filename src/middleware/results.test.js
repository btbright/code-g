import {
  isStateDisqualification,
  hasNonZeroForeignEarnedIncome
} from "./results";

describe("results middleware", () => {
  describe("isStateDisqualification", () => {
    test("should be false if no selection has been made", () => {
      expect(isStateDisqualification([])).toBe(false);
    });

    test("should be true if single non-expansion state is selected", () => {
      expect(
        isStateDisqualification([
          { stateAbbreviation: "NY", months: [1, 2, 3] }
        ])
      ).toBe(true);
    });

    test("should be false if single expansion state is selected", () => {
      expect(
        isStateDisqualification([
          { stateAbbreviation: "AL", months: [1, 2, 3] }
        ])
      ).toBe(false);
    });

    test("should be false if any non-expansion states selected", () => {
      expect(
        isStateDisqualification([
          { stateAbbreviation: "AL", months: [1, 2, 3] },
          { stateAbbreviation: "NY", months: [1, 2, 3] }
        ])
      ).toBe(false);
    });

    test("should be true if single expansion state is selected and is single state confirmed", () => {
      expect(
        isStateDisqualification([{ stateAbbreviation: "NY", months: [] }], true)
      ).toBe(true);
    });

    test("should be false if single expansion state is selected with no months and single state not confirmed", () => {
      expect(
        isStateDisqualification(
          [{ stateAbbreviation: "NY", months: [] }],
          false
        )
      ).toBe(false);
    });
  });

  describe("hasNonZeroForeignEarnedIncome", () => {
    test("should be false if nothing has been selected", () => {
      expect(hasNonZeroForeignEarnedIncome({})).toBe(false);
    });

    test("should be true if it has a valid value", () => {
      expect(hasNonZeroForeignEarnedIncome({ foreignEarnedIncome: "20" })).toBe(
        true
      );
    });

    test("should be true if it has a valid number value", () => {
      expect(hasNonZeroForeignEarnedIncome({ foreignEarnedIncome: 20 })).toBe(
        true
      );
    });

    test("should be false if it is an empty string", () => {
      expect(hasNonZeroForeignEarnedIncome({ foreignEarnedIncome: "" })).toBe(
        false
      );
    });

    test("should find dependent foreign earned income", () => {
      expect(
        hasNonZeroForeignEarnedIncome({
          foreignEarnedIncome: "",
          dependents: [{ foreignEarnedIncome: "20" }]
        })
      ).toBe(true);
    });

    test("should let zero foreign earned income", () => {
      expect(
        hasNonZeroForeignEarnedIncome({
          foreignEarnedIncome: "",
          dependents: [{ foreignEarnedIncome: "0" }]
        })
      ).toBe(false);
    });
  });
});
