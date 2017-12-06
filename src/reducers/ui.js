import * as types from "../actions/action-types";

const initialState = {
  step: 1,
  isConfirmedSingleState: undefined,
  hasOutOfScopeOverride: false,
  isVITAUser: true,
  invalidFields: [],
  result: undefined,
  showReturnFields: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_TOOL:
      return initialState;
    case types.CLEAR_RESULT:
      return Object.assign({}, state, { result: undefined });
    case types.UPDATE_RESULT:
      return Object.assign({}, state, { result: action.result });
    case types.TOGGLE_VITA_USER:
      return Object.assign({}, state, { isVITAUser: !state.isVITAUser });
    case types.TOGGLE_CALCULATIONS:
      return Object.assign({}, state, {
        showReturnFields: !state.showReturnFields
      });
    case types.OVERRIDE_OUT_OF_SCOPE:
      return Object.assign({}, state, {
        hasOutOfScopeOverride: true,
        step: state.step + 1,
        result: undefined
      });
    case types.UPDATE_STEP:
      let step = state.step;
      if (typeof action.increment !== "undefined") {
        step = state.step + action.increment;
      }
      if (typeof action.step !== "undefined") {
        step = action.step;
      }
      return Object.assign({}, state, { step });
    case types.CONFIRM_SINGLE_STATE:
      return Object.assign({}, state, {
        isConfirmedSingleState: action.isConfirmedSingleState
      });
    case types.RESET_RESIDENCE_HISTORY:
	  return Object.assign({}, state, { isConfirmedSingleState: undefined });
	case types.UPDATE_TAXPAYER_RETURN_FIELD:
	  if (action.fieldName === "taxYear" && action.fieldValue === ""){
		return Object.assign({}, state, { isConfirmedSingleState: undefined });
	  }
	  return state;
    case types.ADD_INVALID_FIELD:
      if (
        !!state.invalidFields.find(
          errorField => errorField.fieldName === action.fieldName
        )
      )
        return state;
      return Object.assign({}, state, {
        invalidFields: [
          ...state.invalidFields,
          { fieldName: action.fieldName, errorText: action.errorText }
        ]
      });
    case types.ADD_INVALID_FIELDS:
      const errorsToAdd = action.errors.reduce((errors, error) => {
        //if error exists, don't readd
        if (
          !state.invalidFields.find(
            field =>
              field.fieldName === error.fieldName &&
              field.errorText === error.errorText
          )
        ) {
          errors.push(error);
        }
        return errors;
      }, []);
      return Object.assign({}, state, {
        invalidFields: [...state.invalidFields, ...errorsToAdd]
      });
    case types.REMOVE_INVALID_FIELD:
      return Object.assign({}, state, {
        invalidFields: state.invalidFields.filter(
          error => error.fieldName !== action.fieldName
        )
      });
    case types.REMOVE_INVALID_FIELDS:
      return Object.assign({}, state, {
        invalidFields: state.invalidFields.filter(
          error => action.fieldNames.indexOf(error.fieldName) === -1
        )
      });
    default:
      return state;
  }
};
