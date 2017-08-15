import { isTaxpayerReturnComplete, parseTaxpayerReturn, calculateModifiedAGI, getReferenceFPL, calculatePercentageOfFPL, getModifiedAGIQualificationResult } from './modifiedAGIQualification'
import { isEqual } from 'lodash'
import { returnTests } from './modifiedAGIQualification.test.data.js'

describe('ModifiedAGIQualification logic', ()=>{
	describe('isTaxpayerReturnComplete', ()=>{
		test('should be false if a field is missing', () => {
			expect(isTaxpayerReturnComplete({})).toBe(false);
		});

		test('should be true if fields are present', () => {
			const taxpayerReturn = {
				taxYear: "2017",
				AGI: "100",
				taxExemptInterest: "230",
				foreignEarnedIncome: "0",
				socialSecurityBenefitsTotal: "100",
				socialSecurityBenefitsTaxable: "100",
				numberOfPeopleInTaxHousehold: "4",
				residenceHistory: [{}]
			}

			expect(isTaxpayerReturnComplete(taxpayerReturn)).toBe(true);
		});
	})

	describe('parseTaxpayerReturn', ()=>{
		test('should be parse fields properly', () => {
			const unparsedTaxpayerReturn = {
				taxYear: "2017",
				AGI: "1000.12",
				taxExemptInterest: "230.10",
				foreignEarnedIncome: "0",
				socialSecurityBenefitsTotal: "10.54",
				socialSecurityBenefitsTaxable: "100.22",
				numberOfPeopleInTaxHousehold: "4",
				residenceHistory: [{}],
				dependents: [
					{AGI: "1000.00", socialSecurityBenefitsTotal: "2340.43", socialSecurityBenefitsTaxable: "2929.11"}
				]
			}

			const parsedReturnReference = {
				taxYear: 2017,
				AGI: 1000.12,
				taxExemptInterest: 230.1,
				foreignEarnedIncome: 0,
				socialSecurityBenefitsTotal: 10.54,
				socialSecurityBenefitsTaxable: 100.22,
				numberOfPeopleInTaxHousehold: 4,
				residenceHistory: [{}],
				dependents: [
					{AGI: 1000.00, socialSecurityBenefitsTotal: 2340.43, socialSecurityBenefitsTaxable: 2929.11}
				]
			}

			const parsedReturn = parseTaxpayerReturn(unparsedTaxpayerReturn)

			expect(getObjectDiff(parsedReturnReference, parsedReturn)).toEqual(expect.arrayContaining([]));
		});
	})

	describe('calculateModifiedAGI', ()=>{
		test('should handle simple example', () => {
			const parsedReturnReference = {
				AGI: 16000,
				taxExemptInterest: 150,
				foreignEarnedIncome: 0,
				socialSecurityBenefitsTotal: 5000,
				socialSecurityBenefitsTaxable: 2300,
				dependents: []
			}

			expect(calculateModifiedAGI(parsedReturnReference)).toEqual(18850);
		});

		test('should handle an example w/ dependents', () => {
			const parsedReturnReference = {
				AGI: 16000,
				taxExemptInterest: 150,
				foreignEarnedIncome: 0,
				socialSecurityBenefitsTotal: 5000,
				socialSecurityBenefitsTaxable: 2300,
				dependents: [
					{AGI: 1000.00, socialSecurityBenefitsTotal: 2340.43, socialSecurityBenefitsTaxable: 2929.11}
				]
			}

			expect(calculateModifiedAGI(parsedReturnReference)).toEqual(19261.32);
		});
	})

	describe('getReferenceFPL', ()=>{
		test('should handle simple example', () => {
			expect(getReferenceFPL(2016, 4)).toEqual(24250);
		});

		test('should handle households greater than 8', () => {
			expect(getReferenceFPL(2014, 10)).toEqual(47670);
		});
	})

	describe('calculatePercentageOfFPL', ()=>{
		test('should handle simple example', () => {
			expect(calculatePercentageOfFPL(10000, 12000)).toEqual(120);
		});

		test('should round properly', () => {
			expect(calculatePercentageOfFPL(11000, 12521)).toEqual(113.83);
		});
	})

	describe('getModifiedAGIQualificationResult', ()=>{
		test('should handle simple example', () => {
			const taxpayerReturn = {
				taxYear: "2016",
				AGI: "10000",
				taxExemptInterest: "230",
				foreignEarnedIncome: "0",
				socialSecurityBenefitsTotal: "100",
				socialSecurityBenefitsTaxable: "100",
				numberOfPeopleInTaxHousehold: "4",
				residenceHistory: [{}],
				dependents: []
			}

			expect(getModifiedAGIQualificationResult(taxpayerReturn)).toEqual({fplPercentage: 42.19, isTaxpayerQualified: true});
		});

		test('should handle tests', () => {
			returnTests.forEach(taxpayerReturn => {
				const { result, ...returnTest } = taxpayerReturn;
				const testResult = getModifiedAGIQualificationResult(returnTest)
				const diff = getObjectDiff(result, testResult)
				expect(diff.length).toEqual(0)
			})
		});
	})
})

function getObjectDiff(obj1, obj2) {
    const diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)) {
            result.push(key);
        } else if (isEqual(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(obj2));

    return diff;
}
