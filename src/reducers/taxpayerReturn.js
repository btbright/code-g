import * as types from "../actions/action-types";
import { difference, union } from "lodash";

const initialState = {
  taxYear: undefined,
  residenceHistory: [],
  AGI: undefined,
  taxExemptInterest: undefined,
  foreignEarnedIncome: undefined,
  socialSecurityBenefitsTotal: undefined,
  socialSecurityBenefitsTaxable: undefined,
  dependentsAGI: undefined,
  dependentsSocialSecurityBenefitsTotal: undefined,
  dependentsSocialSecurityBenefitsTaxable: undefined,
  householdTotal: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_RESIDENCE_HISTORY:
      return Object.assign({}, state, { residenceHistory: [] });
    case types.RESIDENCE_HISTORY_STATE_SELECT:
    case types.RESIDENCE_HISTORY_STATE_MONTH_SELECT:
      return Object.assign(
        {},
        state,
        { residenceHistory: residenceHistory(state.residenceHistory, action) }
      );
    case types.UPDATE_TAXPAYER_RETURN_FIELD:
      //TODO - validate field name
      return Object.assign({}, state, { [action.fieldName]: action.fieldValue });
    default:
      return state;
  }
};

function residenceHistory(state = [], action) {
  switch (action.type) {
    case types.RESIDENCE_HISTORY_STATE_SELECT:
      const stateObj = state[action.index]
      //don't reset state if it already exists
      if (
        action.stateAbbreviation &&
        stateObj && stateObj.stateAbbreviation === action.stateAbbreviation
      )
        return state;
      //if this is an unselect event, remove the state at index
      if (typeof action.removeAtIndex !== "undefined")
        return [
          ...state.slice(0, action.removeAtIndex),
          ...state.slice(action.removeAtIndex + 1, state.length)
        ];

      if (stateObj){
        return [
          ...state.slice(0, action.index),
          Object.assign({}, stateObj, {stateAbbreviation: action.stateAbbreviation}),
          ...state.slice(action.index + 1, state.length)
        ];
      }

      //add a new state object into the array with an array to hold month ids
      return [...state, { stateAbbreviation: action.stateAbbreviation, months: [] }];

    case types.RESIDENCE_HISTORY_STATE_MONTH_SELECT:
      const stateObject = state[action.stateIndex];
      const mutationFunction =
        stateObject.months.indexOf(action.monthId) !== -1 ? difference : union;
      const months = mutationFunction(stateObject.months, [action.monthId]);
      return [
        ...state.slice(0, action.stateIndex),
        Object.assign({}, stateObject, {months}),
        ...state.slice(action.stateIndex + 1, state.length)
      ];
    default:
      return state;
  }
}
