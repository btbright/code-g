import * as types from '../actions/action-types';


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
			const result = getCalculatedQualificationResult(state.taxpayerReturn)
			if (result){
				store.dispatch({
					type: types.UPDATE_RESULT,
					result: Object.assign({type: 'calculatedQualification'}, result)
				})
				return
			}
		}
	}

  return next(action)
}

const statesThatDidNotExpandMedicare = [
	"AL", "FL", "GA", "ID", "KS", "LA", "ME",
	"MS", "MI", "NE", "NC", "OK", "SC", "SD",
	"TN", "TX", "UT", "VA", "WI", "WY"
];

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

export function getCalculatedQualificationResult(taxpayerReturn) {
	//if (!isTaxpayerReturnComplete(taxpayerReturn)) return false;
	return false;
}
