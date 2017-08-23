export default {
  taxYear: "taxYear",
  residenceHistory: "residenceHistory",
  AGI: "AGI",
  taxExemptInterest: "taxExemptInterest",
  foreignEarnedIncome: "foreignEarnedIncome",
  socialSecurityBenefitsTotal: "socialSecurityBenefitsTotal",
  socialSecurityBenefitsTaxable: "socialSecurityBenefitsTaxable",
  numberOfPeopleInTaxHousehold: "numberOfPeopleInTaxHousehold"
};

export const validationRules = {
  taxYear: "integer",
  AGI: "money",
  taxExemptInterest: "money",
  foreignEarnedIncome: "money",
  socialSecurityBenefitsTotal: "money",
  socialSecurityBenefitsTaxable: "money",
  numberOfPeopleInTaxHousehold: "integer"
};

export const fieldTypes = {
  taxYear: "integer",
  AGI: "float",
  taxExemptInterest: "float",
  foreignEarnedIncome: "float",
  socialSecurityBenefitsTotal: "float",
  socialSecurityBenefitsTaxable: "float",
  numberOfPeopleInTaxHousehold: "integer"
};

export const dependentFields = [
  "AGI",
  "socialSecurityBenefitsTotal",
  "socialSecurityBenefitsTaxable"
];
