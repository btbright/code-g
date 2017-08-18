import taxpayerReturnFields from "../constants/taxpayerReturnFields";

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
		promptText: "6. Enter total amount of social security benefits (Form 1040, Line 20a)",
		placeholder: "Total social security benefits...",
		isRequired: true
	},
	{
		fieldName: taxpayerReturnFields.socialSecurityBenefitsTaxable,
		promptText: "7. Enter taxable social security benefits (Form 1040, Line 20b)",
		placeholder: "Taxable social security benefits...",
		isRequired: true
	}
]


export default {
	2 : individualDataFields
}
