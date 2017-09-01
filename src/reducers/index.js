import { combineReducers } from "redux";
import taxpayerReturn from "./taxpayerReturn";
import ui from "./ui";
import { statesThatDidNotExpandMedicare } from "../constants/states";
import { flatten } from "lodash";

const rootReducer = combineReducers({
  taxpayerReturn,
  ui
});

export default rootReducer;

/* globalss selectors */

export function getTaxpayerReturn(state) {
  return state.taxpayerReturn;
}

export function getUI(state) {
  return state.ui;
}

export function decorateFieldsWithState(fields, taxpayerReturn, ui) {
  return fields.map(field => {
    const error = ui.invalidFields.find(
      errorField => errorField.fieldName === field.fieldName
    );
    return Object.assign({}, field, {
      value: taxpayerReturn[field.fieldName],
      hasError: !!error,
      errorText: error ? error.errorText : ""
    });
  });
}

//utility function that filters expansion/non-expansion selected states
//and allows for projection of the results
function getSelectedStateObjects(state, transformation = x => x) {
  const selectedStates = state.taxpayerReturn.residenceHistory;

  const nonExpansion = selectedStates.filter(
    state =>
      statesThatDidNotExpandMedicare.indexOf(state.stateAbbreviation) !== -1
  );
  const expansion = selectedStates.filter(
    state =>
      statesThatDidNotExpandMedicare.indexOf(state.stateAbbreviation) === -1
  );
  return {
    nonExpansion: transformation(nonExpansion),
    expansion: transformation(expansion)
  };
}

export function getSelectedStateAbbreviations(state) {
  return getSelectedStateObjects(state, states =>
    states.map(stateObj => stateObj.stateAbbreviation)
  );
}

export function getSelectedMonths(state) {
  return getSelectedStateObjects(state, states =>
    flatten(states.map(stateObj => stateObj.months))
  );
}
