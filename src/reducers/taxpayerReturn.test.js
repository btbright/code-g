import * as actions from '../actions/actions'
import taxpayerReturn from './taxpayerReturn'
import taxpayerReturnFields from '../constants/taxpayerReturnFields'

describe('taxpayerReturn actions/reducer', ()=>{
	test('should mutate return fields', () => {
	  const testState = {
			[taxpayerReturnFields.taxExemptInterest]: undefined,
			[taxpayerReturnFields.taxYear]: 2016
		}

		const testAction = actions.updateTaxpayerReturnField(taxpayerReturnFields.taxExemptInterest, 10)
		const result = taxpayerReturn(testState, testAction)
		expect(result[taxpayerReturnFields.taxExemptInterest]).toBe(10);
		expect(result[taxpayerReturnFields.taxYear]).toBe(2016);
	});

	test('should add a state', () => {
	  const testState = {
			residenceHistory: []
		}
		const testAction = actions.selectState("AL", 0)
		const result = taxpayerReturn(testState, testAction)
		expect(result.residenceHistory[0].stateAbbreviation).toBe("AL");
		expect(result.residenceHistory[0].months).toEqual(expect.arrayContaining([]));
		expect(result.residenceHistory.length).toBe(1);
	});

	test('should remove states', () => {
	  const testState = {
			residenceHistory: [
				{stateAbbreviation: "AL", months: [1,4,5,6,7]},
				{stateAbbreviation: "MS", months: [2,3,8]}
			]
		}
		const testAction = actions.removeState(0)
		const result = taxpayerReturn(testState, testAction)
		expect(result.residenceHistory[0].stateAbbreviation).toBe("MS");
		expect(result.residenceHistory[0].months).toEqual(expect.arrayContaining([2,3,8]));
		expect(result.residenceHistory.length).toBe(1);
	});

	test('should update a states', () => {
	  const testState = {
			residenceHistory: [
				{stateAbbreviation: "AL", months: [1,4,5,6,7]},
				{stateAbbreviation: "MS", months: [2,3,8]}
			]
		}
		const testAction = actions.selectState("CO", 0)
		const result = taxpayerReturn(testState, testAction)
		expect(result.residenceHistory[0].stateAbbreviation).toBe("CO");
		expect(result.residenceHistory[0].months).toEqual(expect.arrayContaining([1,4,5,6,7]));
		expect(result.residenceHistory.length).toBe(2);
	});

	test('should not re-add a state', () => {
	  const testState = {
			residenceHistory: [
				{stateAbbreviation: "AL", months: [1,4,5,6,7]},
				{stateAbbreviation: "MS", months: [2,3,8]}
			]
		}
		const testAction = actions.selectState("AL", 0)
		const result = taxpayerReturn(testState, testAction)
		expect(result.residenceHistory[0].stateAbbreviation).toBe("AL");
		expect(result.residenceHistory[0].months).toEqual(expect.arrayContaining([1,4,5,6,7]));
		expect(result.residenceHistory.length).toBe(2);
	});

	test('should add a month to a state', () => {
	  const testState = {
			residenceHistory: [
				{stateAbbreviation: "AL", months: [1,4,5,6,7]},
				{stateAbbreviation: "MS", months: [2,3,8]}
			]
		}
		const testAction = actions.selectStateMonth(0, 9)
		const result = taxpayerReturn(testState, testAction)
		expect(result.residenceHistory[0].months).toEqual(expect.arrayContaining([1,4,5,6,7,9]));
	});

	test('should remove a month to a state', () => {
	  const testState = {
			residenceHistory: [
				{stateAbbreviation: "AL", months: [1,4,5,6,7,9]},
				{stateAbbreviation: "MS", months: [2,3,8]}
			]
		}
		const testAction = actions.selectStateMonth(0, 9)
		const result = taxpayerReturn(testState, testAction)
		expect(result.residenceHistory[0].months).toEqual(expect.arrayContaining([1,4,5,6,7]));
	});

	test('should not remove props from the root state', () => {
	  const testState = {
			taxYear: 2016,
			residenceHistory: [
				{stateAbbreviation: "AL", months: [1,4,5,6,7,9]},
				{stateAbbreviation: "MS", months: [2,3,8]}
			]
		}
		const testAction = actions.selectStateMonth(0, 9)
		const result = taxpayerReturn(testState, testAction)
		expect(result.taxYear).toEqual(2016);
	});
})
