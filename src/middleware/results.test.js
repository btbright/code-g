import { isStateDisqualification } from './results'


describe('results middleware', ()=>{
	describe('isStateDisqualification', ()=>{
		test('should be false if no selection has been made', () => {
			expect(isStateDisqualification([])).toBe(false);
		});

		test('should be true if single non-expansion state is selected', () => {
			expect(isStateDisqualification([{stateAbbreviation: "NY", months: [1,2,3]}])).toBe(true);
		});

		test('should be false if single expansion state is selected', () => {
			expect(isStateDisqualification([{stateAbbreviation: "AL", months: [1,2,3]}])).toBe(false);
		});

		test('should be false if any non-expansion states selected', () => {
			expect(isStateDisqualification([{stateAbbreviation: "AL", months: [1,2,3]}, {stateAbbreviation: "NY", months: [1,2,3]}])).toBe(false);
		});

		test('should be true if single expansion state is selected and is single state confirmed', () => {
			expect(isStateDisqualification([{stateAbbreviation: "NY", months: []}], true)).toBe(true);
		});

		test('should be false if single expansion state is selected with no months and single state not confirmed', () => {
			expect(isStateDisqualification([{stateAbbreviation: "NY", months: []}], false)).toBe(false);
		});
	})
})
