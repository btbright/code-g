import taxpayerReturnFields from "../constants/taxpayerReturnFields";

export const yearAndStateFields = [
  {
    fieldName: taxpayerReturnFields.taxYear,
    promptText: "1. For what tax year are you trying to claim this exemption?",
    placeholder: "----",
    isRequired: true
  },
  {
    fieldName: taxpayerReturnFields.residenceHistory,
    promptText: "2. In what state(s) did you live in this tax year?",
    isRequired: true
  }
];

export const individualDataFields = [
  {
    fieldName: taxpayerReturnFields.AGI,
    promptText: "3. Enter AGI (Form 1040, Line 37 or 38)",
    placeholder: "AGI...",
    isRequired: true
  },
  {
    fieldName: taxpayerReturnFields.taxExemptInterest,
    promptText: "4. Enter tax-exempt interest (Form 1040, Line 8b)",
    placeholder: "Tax exempt interest...",
    isRequired: true
  },
  {
    fieldName: taxpayerReturnFields.foreignEarnedIncome,
    promptText: "5. Enter foreign earned income (Form 2555, Line 45 + Line 50)",
    placeholder: "Foreign earned income...",
    isRequired: true
  },
  {
    fieldName: taxpayerReturnFields.socialSecurityBenefitsTotal,
    promptText:
      "6. Enter total amount of social security benefits (Form 1040, Line 20a)",
    placeholder: "Total social security benefits...",
    isRequired: true
  },
  {
    fieldName: taxpayerReturnFields.socialSecurityBenefitsTaxable,
    promptText:
      "7. Enter taxable social security benefits (Form 1040, Line 20b)",
    placeholder: "Taxable social security benefits...",
    isRequired: true
  }
];

export const dependentFields = [
  {
    fieldName: taxpayerReturnFields.AGI,
    promptText: "1. Enter dependent’s AGI (Form 1040, Line 37 or 38)",
    placeholder: "AGI...",
    isRequired: true
  },
  {
    fieldName: taxpayerReturnFields.socialSecurityBenefitsTotal,
    promptText:
      "2. Enter dependent’s total amount of social security benefits (Form 1040, Line 20a)",
    placeholder: "Total social security benefits...",
    isRequired: true
  },
  {
    fieldName: taxpayerReturnFields.socialSecurityBenefitsTaxable,
    promptText:
      "3. Enter dependent’s taxable social security benefits (Form 1040, Line 20b)",
    placeholder: "Taxable social security benefits...",
    isRequired: true
  }
];

export const householdSizeFields = [
  {
    fieldName: taxpayerReturnFields.numberOfPeopleInTaxHousehold,
    promptText:
      "9. How many people total are in the tax household? (Form 1040, Line 6d)",
    placeholder: "Total people...",
    isRequired: true
  }
];

export default {
  1: yearAndStateFields,
  2: individualDataFields,
  3: dependentFields,
  4: householdSizeFields
};
