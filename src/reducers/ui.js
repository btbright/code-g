import * as types from "../actions/action-types";

const initialState = {
	step : 1,
	isConfirmedSingleState: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
