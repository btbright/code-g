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

export function getTaxpayerReturn(state) {
  return state.taxpayerReturn;
}

export function getUI(state) {
  return state.ui;
}

function getSelectedStateObjects(selectedStates, transformation = x=>x){
  const nonExpansion = selectedStates.filter(
    state => statesThatDidNotExpandMedicare.indexOf(state.stateAbbreviation) !== -1
  );
  const expansion = selectedStates.filter(
    state => statesThatDidNotExpandMedicare.indexOf(state.stateAbbreviation) === -1
  );
  return {
    nonExpansion: transformation(nonExpansion),
    expansion: transformation(expansion)
  };
}

const getStateAbbreviation = states => states.map(stateObj => stateObj.stateAbbreviation);

export function getSelectedStateAbbreviations(state) {
  return getSelectedStateObjects(state.taxpayerReturn.residenceHistory, getStateAbbreviation);
}

const getFlatMonths = states => flatten(states.map(stateObj => stateObj.months))

export function getSelectedMonths(state){
  return getSelectedStateObjects(state.taxpayerReturn.residenceHistory, getFlatMonths);
}
