import * as types from './action-types';

export function updateTaxpayerReturnField(fieldName, fieldValue){
	return {
		type: types.UPDATE_TAXPAYER_RETURN_FIELD,
		fieldName,
		fieldValue
	}
}

export function selectState(stateAbbreviation, index){
	return {
		type: types.RESIDENCE_HISTORY_STATE_SELECT,
		stateAbbreviation,
		index
	}
}

export function removeState(removeAtIndex){
	return {
		type: types.RESIDENCE_HISTORY_STATE_SELECT,
		removeAtIndex
	}
}

export function selectStateMonth(stateIndex, monthId){
	return {
		type: types.RESIDENCE_HISTORY_STATE_MONTH_SELECT,
		stateIndex,
		monthId
	}
}

export function confirmSingleState(isConfirmedSingleState){
	return {
		type: types.CONFIRM_SINGLE_STATE,
		isConfirmedSingleState
	}
}

export function resetResidenceHistory(){
	return {
		type: types.RESET_RESIDENCE_HISTORY
	}
}
