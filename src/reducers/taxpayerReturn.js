import * as types from "../actions/action-types";
import { difference, union } from "lodash";
import { dependentFields } from "../constants/taxpayerReturnFields";

const initialState = {
  taxYear: "",
  residenceHistory: [],
  AGI: "",
  taxExemptInterest: "",
  foreignEarnedIncome: "",
  socialSecurityBenefitsTotal: "",
  socialSecurityBenefitsTaxable: "",
  dependents: [],
  numberOfPeopleInTaxHousehold: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_TOOL:
      return initialState;
    case types.RESET_RESIDENCE_HISTORY:
      return Object.assign({}, state, { residenceHistory: [] });
    case types.RESIDENCE_HISTORY_STATE_SELECT:
    case types.RESIDENCE_HISTORY_STATE_MONTH_SELECT:
    case types.CONFIRM_SINGLE_STATE:
      return Object.assign({}, state, {
        residenceHistory: residenceHistory(state.residenceHistory, action)
      });
    case types.UPDATE_DEPENDENT_FIELD:
      const dependentToUpdate = state.dependents[action.index];
      const newDependents = [
        ...state.dependents.slice(0, action.index),
        Object.assign({}, dependentToUpdate, {
          [action.fieldName]: action.fieldValue
        }),
        ...state.dependents.slice(action.index + 1, state.dependents.length)
      ];
      return Object.assign({}, state, { dependents: newDependents });
    case types.ADD_DEPENDENT:
      const emptyDependent = dependentFields.reduce((dependent, field) => {dependent[field] = ""; return dependent}, {});
      return Object.assign({}, state, {
        //used to avoid react error
        dependents: [...state.dependents, emptyDependent]
      });
    case types.REMOVE_DEPENDENT:
      return Object.assign({}, state, {
        dependents: [
          ...state.dependents.slice(0, action.index),
          ...state.dependents.slice(action.index + 1, state.dependents.length)
        ]
      });
    case types.UPDATE_TAXPAYER_RETURN_FIELD:
      return Object.assign({}, state, {
        [action.fieldName]: action.fieldValue
      });
    default:
      return state;
  }
};

function residenceHistory(state = [], action) {
  switch (action.type) {
    case types.CONFIRM_SINGLE_STATE:
      if (!action.isConfirmedSingleState) return state;
      const singleStateObj = state[0];
      return [
        Object.assign({}, singleStateObj, {
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        })
      ];
    case types.RESIDENCE_HISTORY_STATE_SELECT:
      const stateObj = state[action.index];
      //don't reset state if it already exists
      if (
        action.stateAbbreviation &&
        stateObj &&
        stateObj.stateAbbreviation === action.stateAbbreviation
      )
        return state;
      //if this is an unselect event, remove the state at index
      if (typeof action.removeAtIndex !== "undefined")
        return [
          ...state.slice(0, action.removeAtIndex),
          ...state.slice(action.removeAtIndex + 1, state.length)
        ];

      if (stateObj) {
        return [
          ...state.slice(0, action.index),
          Object.assign({}, stateObj, {
            stateAbbreviation: action.stateAbbreviation
          }),
          ...state.slice(action.index + 1, state.length)
        ];
      }

      //add a new state object into the array with an array to hold month ids
      return [
        ...state,
        { stateAbbreviation: action.stateAbbreviation, months: [] }
      ];

    case types.RESIDENCE_HISTORY_STATE_MONTH_SELECT:
      const stateObject = state[action.stateIndex];
      const mutationFunction =
        stateObject.months.indexOf(action.monthId) !== -1 ? difference : union;
      const months = mutationFunction(stateObject.months, [action.monthId]);
      return [
        ...state.slice(0, action.stateIndex),
        Object.assign({}, stateObject, { months }),
        ...state.slice(action.stateIndex + 1, state.length)
      ];
    default:
      return state;
  }
}
