import { fieldTypes, dependentFields } from "../constants/taxpayerReturnFields";
import {
  additionalFamilyMemberAmounts,
  federalPovertyLineLevels
} from "../constants/federalPovertyLineData";

//returns false if there isn't enough data to perform the calculation,
//otherwise it returns the results and metadata
export function getModifiedAGIQualificationResult(taxpayerReturn) {
  if (!isTaxpayerReturnComplete(taxpayerReturn)) return false;

  const parsedTaxpayerReturn = parseTaxpayerReturn(taxpayerReturn);
  const modifiedAGI = calculateModifiedAGI(parsedTaxpayerReturn);
  const referenceFPL = getReferenceFPL(
    taxpayerReturn.taxYear,
    taxpayerReturn.numberOfPeopleInTaxHousehold
  );
  const fplPercentage = calculatePercentageOfFPL(referenceFPL, modifiedAGI);

  return {
    fplPercentage,
    isTaxpayerQualified: fplPercentage < 138
  };
}

//validates that we have the data needed to generate a result
export function isTaxpayerReturnComplete(taxpayerReturn) {
  return (
    !!taxpayerReturn.taxYear &&
    !!taxpayerReturn.AGI &&
    !!taxpayerReturn.taxExemptInterest &&
    !!taxpayerReturn.foreignEarnedIncome &&
    !!taxpayerReturn.socialSecurityBenefitsTotal &&
    !!taxpayerReturn.socialSecurityBenefitsTaxable &&
    !!taxpayerReturn.numberOfPeopleInTaxHousehold &&
    !!taxpayerReturn.residenceHistory &&
    isTaxpayerReturnComplete.length !== 0
  );
}

//parses the validated strings input by the user to the correct
//type to prepare for the calculations
export function parseTaxpayerReturn(taxpayerReturn) {
  const parsedObject = Object.assign({}, taxpayerReturn);
  Object.keys(fieldTypes).forEach(parseField(taxpayerReturn, parsedObject));
  parsedObject.dependents = taxpayerReturn.dependents.map(dependent => {
    const newDependent = {};
    dependentFields.forEach(parseField(dependent, newDependent));
    return newDependent;
  });
  return parsedObject;
}

//mutates the "destination" object with a parsed value
function parseField(source, destination) {
  return fieldName => {
    const parseFunction =
      fieldTypes[fieldName] === "integer" ? parseInt : parseFloat;
    destination[fieldName] = parseFunction(source[fieldName], 10);
  };
}

export function calculateModifiedAGI(taxpayerReturn) {
  //generate the total without dependents
  const individualTotal =
    taxpayerReturn.AGI +
    taxpayerReturn.taxExemptInterest +
    taxpayerReturn.foreignEarnedIncome +
    taxpayerReturn.socialSecurityBenefitsTotal -
    taxpayerReturn.socialSecurityBenefitsTaxable;

  //total amount added by dependents
  const dependentsTotal = taxpayerReturn.dependents.reduce(
    (total, dependent) => {
      return (
        total +
        dependent.AGI +
        dependent.socialSecurityBenefitsTotal -
        dependent.socialSecurityBenefitsTaxable
      );
    },
    0
  );

  return individualTotal + dependentsTotal;
}

//get the federal poverty level the user's modified AGI will be compared to
export function getReferenceFPL(taxYear, numberOfPeopleInTaxHousehold) {
  const householdMax = 8;
  const taxYearKey = taxYear.toString();

  //if the household has more than max, we'll use the max as a base
  const householdSizeKey =
    numberOfPeopleInTaxHousehold <= householdMax
      ? numberOfPeopleInTaxHousehold.toString()
      : "8";
  const baseFPL = federalPovertyLineLevels[taxYearKey][householdSizeKey];

  //if the household is less than the max, return the raw number from the data
  if (numberOfPeopleInTaxHousehold <= householdMax) return baseFPL;

  //get the amount each additional family member will add (this changes by year)
  const additionalFamilyMemberAmount =
    additionalFamilyMemberAmounts[taxYearKey];

  //get the number of family members beyond the max in the data
  const numberOfAdditionalFamilyMembers =
    numberOfPeopleInTaxHousehold - householdMax;

  //to to the base, add the specified amount for each family member past the max
  return (
    baseFPL + additionalFamilyMemberAmount * numberOfAdditionalFamilyMembers
  );
}

//rounded to nearest hundreth
export function calculatePercentageOfFPL(referenceFPL, modifiedAGI) {
  return Math.round(modifiedAGI / referenceFPL * 10000) / 100;
}
