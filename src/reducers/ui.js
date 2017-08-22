import * as types from "../actions/action-types";

const initialState = {
	step : 1,
	isConfirmedSingleState: undefined,
	invalidFields: [],
	result: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
		case types.UPDATE_RESULT:
			return Object.assign({}, state, {result: action.result})
		case types.UPDATE_STEP:
			let step = state.step;
			if (typeof action.increment !== "undefined"){
				step = state.step + action.increment;
			}
			if (typeof action.step !== "undefined"){
				step = action.step;
			}
			return Object.assign({}, state, {step})
    case types.CONFIRM_SINGLE_STATE:
      return Object.assign({}, state, { isConfirmedSingleState: action.isConfirmedSingleState });
		case types.RESET_RESIDENCE_HISTORY:
			return Object.assign({}, state, { isConfirmedSingleState: undefined });
		case types.ADD_INVALID_FIELD:
			if (!!state.invalidFields.find(errorField => errorField.fieldName === action.fieldName)) return state
			return Object.assign({}, state, { invalidFields: [...state.invalidFields, {fieldName: action.fieldName, errorText: action.errorText}] });
		case types.ADD_INVALID_FIELDS:
			const errorsToAdd = action.errors.reduce((errors, error) => {
				//if error exists, don't readd
				if (!state.invalidFields.find(field => field.fieldName === error.fieldName && field.errorText === error.errorText)){
					errors.push(error)
				}
				return errors;
			}, []);
			return Object.assign({}, state, { invalidFields: [...state.invalidFields, ...errorsToAdd ]});
		case types.REMOVE_INVALID_FIELD:
			return Object.assign({}, state, { invalidFields: state.invalidFields.filter(error => error.fieldName !== action.fieldName) });
		case types.REMOVE_INVALID_FIELDS:
			return Object.assign({}, state, { invalidFields: state.invalidFields.filter(error => action.fieldNames.indexOf(error.fieldName) === -1) });
    default:
      return state;
  }
};
