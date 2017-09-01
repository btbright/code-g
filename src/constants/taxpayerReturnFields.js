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
  "taxExemptInterest",
  "foreignEarnedIncome",
  "socialSecurityBenefitsTotal",
  "socialSecurityBenefitsTaxable"
];

export const resultFields = {
  AGI: {name: "AGI"},
  dependents: {name: "dependents"},
  taxExemptInterest: {name: "Tax Exempt Interest"},
  foreignEarnedIncome: {name: "Foreign Earned Income"},
  socialSecurityBenefitsTotal: {name: "Social Security Benefits Total"},
  socialSecurityBenefitsTaxable: {name: "Social Security Benefits Taxable", type: "negative"}
}
