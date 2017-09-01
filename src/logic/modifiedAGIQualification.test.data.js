export const returnTests = [
  {
    taxYear: "2016",
    AGI: "14000",
    taxExemptInterest: "0",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "3000",
    socialSecurityBenefitsTaxable: "2600",
    numberOfPeopleInTaxHousehold: "2",
    residenceHistory: [{}],
    dependents: [
      {
        AGI: "7800",
        socialSecurityBenefitsTotal: "2600",
        socialSecurityBenefitsTaxable: "2500",
        taxExemptInterest: "0",
        foreignEarnedIncome: "0"
      }
    ],
    result: { fplPercentage: 139.99, isTaxpayerQualified: false }
  },
  {
    taxYear: "2016",
    AGI: "24500",
    taxExemptInterest: "280",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "12000",
    socialSecurityBenefitsTaxable: "10600",
    numberOfPeopleInTaxHousehold: "3",
    residenceHistory: [{}],
    dependents: [],
    result: { fplPercentage: 130.31, isTaxpayerQualified: true }
  },
  {
    taxYear: "2016",
    AGI: "48000",
    taxExemptInterest: "140",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "0",
    socialSecurityBenefitsTaxable: "0",
    numberOfPeopleInTaxHousehold: "5",
    residenceHistory: [{}],
    dependents: [
      {
        AGI: "1250",
        socialSecurityBenefitsTotal: "0",
        socialSecurityBenefitsTaxable: "0",
        taxExemptInterest: "0",
        foreignEarnedIncome: "0"
      }
    ],
    result: { fplPercentage: 173.85, isTaxpayerQualified: false }
  },
  {
    taxYear: "2016",
    AGI: "21000",
    taxExemptInterest: "50",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "12000",
    socialSecurityBenefitsTaxable: "11100",
    numberOfPeopleInTaxHousehold: "4",
    residenceHistory: [{}],
    dependents: [
      {
        AGI: "1300",
        socialSecurityBenefitsTotal: "4000",
        socialSecurityBenefitsTaxable: "3700",
        taxExemptInterest: "0",
        foreignEarnedIncome: "0"
      }
    ],
    result: { fplPercentage: 97.11, isTaxpayerQualified: true }
  },
  {
    taxYear: "2015",
    AGI: "13500",
    taxExemptInterest: "60",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "5000",
    socialSecurityBenefitsTaxable: "4200",
    numberOfPeopleInTaxHousehold: "3",
    residenceHistory: [{}],
    dependents: [
      {
        AGI: "6500",
        socialSecurityBenefitsTotal: "0",
        socialSecurityBenefitsTaxable: "0",
        taxExemptInterest: "0",
        foreignEarnedIncome: "0"
      }
    ],
    result: { fplPercentage: 105.41, isTaxpayerQualified: true }
  },
  {
    taxYear: "2015",
    AGI: "18600",
    taxExemptInterest: "0",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "4100",
    socialSecurityBenefitsTaxable: "3800",
    numberOfPeopleInTaxHousehold: "2",
    residenceHistory: [{}],
    dependents: [],
    result: { fplPercentage: 120.15, isTaxpayerQualified: true }
  },
  {
    taxYear: "2015",
    AGI: "17000",
    taxExemptInterest: "0",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "15000",
    socialSecurityBenefitsTaxable: "12800",
    numberOfPeopleInTaxHousehold: "2",
    residenceHistory: [{}],
    dependents: [
      {
        AGI: "0",
        socialSecurityBenefitsTotal: "4000",
        socialSecurityBenefitsTaxable: "0",
        taxExemptInterest: "0",
        foreignEarnedIncome: "0"
      }
    ],
    result: { fplPercentage: 147.49, isTaxpayerQualified: false }
  },
  {
    taxYear: "2015",
    AGI: "38000",
    taxExemptInterest: "200",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "0",
    socialSecurityBenefitsTaxable: "0",
    numberOfPeopleInTaxHousehold: "4",
    residenceHistory: [{}],
    dependents: [
      {
        AGI: "6400",
        socialSecurityBenefitsTotal: "0",
        socialSecurityBenefitsTaxable: "0",
        taxExemptInterest: "0",
        foreignEarnedIncome: "0"
      }
    ],
    result: { fplPercentage: 187, isTaxpayerQualified: false }
  },
  {
    taxYear: "2014",
    AGI: "30000",
    taxExemptInterest: "0",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "8000",
    socialSecurityBenefitsTaxable: "6400",
    numberOfPeopleInTaxHousehold: "4",
    residenceHistory: [{}],
    dependents: [
      {
        AGI: "0",
        socialSecurityBenefitsTotal: "4300",
        socialSecurityBenefitsTaxable: "3900",
        taxExemptInterest: "0",
        foreignEarnedIncome: "0"
      }
    ],
    result: { fplPercentage: 135.88, isTaxpayerQualified: true }
  },
  {
    taxYear: "2014",
    AGI: "37000",
    taxExemptInterest: "0",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "0",
    socialSecurityBenefitsTaxable: "0",
    numberOfPeopleInTaxHousehold: "5",
    residenceHistory: [{}],
    dependents: [
      {
        AGI: "6400",
        socialSecurityBenefitsTotal: "0",
        socialSecurityBenefitsTaxable: "0",
        taxExemptInterest: "0",
        foreignEarnedIncome: "0"
      }
    ],
    result: { fplPercentage: 157.42, isTaxpayerQualified: false }
  },
  {
    taxYear: "2014",
    AGI: "11000",
    taxExemptInterest: "0",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "12000",
    socialSecurityBenefitsTaxable: "9600",
    numberOfPeopleInTaxHousehold: "1",
    residenceHistory: [{}],
    dependents: [],
    result: { fplPercentage: 116.62, isTaxpayerQualified: true }
  },
  {
    taxYear: "2014",
    AGI: "20000",
    taxExemptInterest: "40",
    foreignEarnedIncome: "0",
    socialSecurityBenefitsTotal: "0",
    socialSecurityBenefitsTaxable: "0",
    numberOfPeopleInTaxHousehold: "2",
    residenceHistory: [{}],
    dependents: [
      {
        AGI: "2500",
        socialSecurityBenefitsTotal: "0",
        socialSecurityBenefitsTaxable: "0",
        taxExemptInterest: "0",
        foreignEarnedIncome: "0"
      }
    ],
    result: { fplPercentage: 145.33, isTaxpayerQualified: false }
  }
];
