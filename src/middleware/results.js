import * as types from '../actions/action-types';
import states, { statesThatDidNotExpandMedicare } from '../constants/states'
import monthNames from '../constants/months'
import { getSelectedStateAbbreviations, getSelectedMonths } from '../reducers'
import { getModifiedAGIQualificationResult } from '../logic/modifiedAGIQualification'

export default store => next => action => {
	const state = store.getState();

	if (action.type === types.UPDATE_STEP || (action.type === types.CONFIRM_SINGLE_STATE && action.isConfirmedSingleState)){
		if (isStateDisqualification(state.taxpayerReturn.residenceHistory, action.isConfirmedSingleState)){
			store.dispatch({
				type: types.UPDATE_RESULT,
				result: {
					type: 'stateDisqualification'
				}
			})
			return
		}
	}

	if (action.type === types.UPDATE_STEP){
		if (state.ui.invalidFields.length === 0){
			const result = getModifiedAGIQualificationResult(state.taxpayerReturn)
			if (result){
				const type = result.isTaxpayerQualified ? "qualified" : "modifiedAGIDisqualification"
				const stateNames = getSelectedStateAbbreviations(state).nonExpansion.map(stateAbbreviation => states[stateAbbreviation]);
				console.log('getSelectedMonths(state).nonExpansion', getSelectedMonths(state).nonExpansion)
				const months = getSelectedMonths(state).nonExpansion.map(monthId => monthNames[monthId-1]);
				store.dispatch({
					type: types.UPDATE_RESULT,
					result: Object.assign({type, stateNames, months}, result)
				})
				return
			}
		}

		if (hasNonZeroForeignEarnedIncome(state.taxpayerReturn.foreignEarnedIncome)){
			store.dispatch({
				type: types.UPDATE_RESULT,
				result: {
					type: 'outOfVITAScopeDisqualification'
				}
			})
			return
		}
	}

  return next(action)
}

export function hasNonZeroForeignEarnedIncome(foreignEarnedIncomeValue){
	const parsed = parseInt(foreignEarnedIncomeValue, 10);
	if (isNaN(parsed)) return false;
	return parsed !== 0;
}

export function isStateDisqualification(residenceHistory, isConfirmedSingleState = false) {
  if (residenceHistory.length === 0) return false;

  const selectedStates = residenceHistory
    .filter(state => (state.months.length !== 0 || isConfirmedSingleState))
    .map(state => state.stateAbbreviation);

  const invalidSelectedStates = selectedStates.filter(
    state => statesThatDidNotExpandMedicare.indexOf(state) === -1
  );
  return selectedStates.length !== 0 && selectedStates.length === invalidSelectedStates.length;
}