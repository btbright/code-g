import * as types from './action-types';
import { validationRules } from '../constants/taxpayerReturnFields'

const rules = {
	money: value => value.match(/^\d+(?:\.?\d{0,2})$/),
	integer:  value => value.match(/^\d+$/)
}

function runValidationRule(validationRuleName, fieldValue){
	return rules[validationRuleName](fieldValue);
}

export function updateTaxpayerReturnField(fieldName, fieldValue){
	return dispatch => {
		const validationRuleName = validationRules[fieldName];
		if (validationRuleName && fieldValue !== ""){
			const isValid = runValidationRule(validationRuleName, fieldValue);
			const type = isValid ? types.REMOVE_INVALID_FIELD : types.ADD_INVALID_FIELD;
			dispatch({
				type,
				fieldName
			})
		}

		dispatch({
			type: types.UPDATE_TAXPAYER_RETURN_FIELD,
			fieldName,
			fieldValue
		})
	}
}

export function updateDependentField(index, fieldName, fieldValue){
	return dispatch => {
		const validationRuleName = validationRules[fieldName];
		if (validationRuleName && fieldValue !== ""){
			const isValid = runValidationRule(validationRuleName, fieldValue);
			const type = isValid ? types.REMOVE_INVALID_FIELD : types.ADD_INVALID_FIELD;
			dispatch({
				type,
				fieldName: `dependent:${index}:${fieldName}`
			})
		}

		dispatch({
			type: types.UPDATE_DEPENDENT_FIELD,
			index,
			fieldName,
			fieldValue
		})
	}
}

export function addDependent(){
	return {
		type: types.ADD_DEPENDENT
	}
}

export function removeDependent(index){
	return {
		type: types.REMOVE_DEPENDENT,
		index
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
