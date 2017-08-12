import * as types from './action-types';

export function nextStep(){
	return {
		type: types.UPDATE_STEP,
		increment: 1
	}
}

export function previousStep(){
	return {
		type: types.UPDATE_STEP,
		increment: -1
	}
}
