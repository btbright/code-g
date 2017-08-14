export default {
	taxYear: 'taxYear',
	AGI: 'AGI',
	taxExemptInterest: 'taxExemptInterest',
	foreignEarnedIncome: 'foreignEarnedIncome',
	socialSecurityBenefitsTotal: 'socialSecurityBenefitsTotal',
	socialSecurityBenefitsTaxable: 'socialSecurityBenefitsTaxable',
	isClaimingDependents: 'isClaimingDependents',
	numberOfPeopleInTaxHousehold: 'numberOfPeopleInTaxHousehold'
}

export const validationRules = {
	AGI: 'money',
	taxExemptInterest: 'money',
	foreignEarnedIncome: 'money',
	socialSecurityBenefitsTotal: 'money',
	socialSecurityBenefitsTaxable: 'money',
	numberOfPeopleInTaxHousehold:  'integer'
}
