import { getSelectedStateAbbreviations, getSelectedMonths } from "./";

describe("getSelectedStateAbbreviations", () => {
  test("generate lists of correct expansion and non-expansion states", () => {
    const testData = {
      taxpayerReturn: {
        residenceHistory: [
          { stateAbbreviation: "AL" },
          { stateAbbreviation: "AZ" },
          { stateAbbreviation: "FL" }
        ]
      }
    };
    const selectedStates = getSelectedStateAbbreviations(testData);
    expect(selectedStates.expansion.length).toEqual(1);
    expect(selectedStates.nonExpansion.length).toEqual(2);
  });
});

describe("getSelectedMonths", () => {
  test("generate lists of correct expansion and non-expansion months", () => {
    const testData = {
      taxpayerReturn: {
        residenceHistory: [
          { stateAbbreviation: "AL", months: [1, 2, 3] },
          { stateAbbreviation: "AZ", months: [4, 5, 6, 7] },
          { stateAbbreviation: "FL", months: [8, 9, 10, 11, 12] }
        ]
      }
    };
    const selectedMonths = getSelectedMonths(testData);
    expect(selectedMonths.expansion.length).toEqual(4);
    expect(selectedMonths.nonExpansion.length).toEqual(8);
  });
});
