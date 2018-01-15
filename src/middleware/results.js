import * as types from "../actions/action-types";
import { statesThatDidNotExpandMedicaid } from "../constants/states";
import { getSelectedStateAbbreviations } from "../reducers";
import { getModifiedAGIQualificationResult } from "../logic/modifiedAGIQualification";

export default store => next => action => {
  const state = store.getState();

  if (
    action.type === types.UPDATE_STEP ||
    (action.type === types.CONFIRM_SINGLE_STATE &&
      action.isConfirmedSingleState)
  ) {
    if (
      isStateDisqualification(
        state.taxpayerReturn.taxYear,
        state.taxpayerReturn.residenceHistory,
        action.isConfirmedSingleState
      )
    ) {
      store.dispatch({
        type: types.UPDATE_RESULT,
        result: {
          type: "stateDisqualification",
          isTaxpayerQualified: false,
          taxYear: state.taxpayerReturn.taxYear
        }
      });
      return;
    }
  }

  if (action.type === types.UPDATE_STEP) {
    if (state.ui.invalidFields.length === 0 && state.ui.step === 4 && action.increment === 1) {
      const result = getModifiedAGIQualificationResult(state.taxpayerReturn);
      if (result) {
        const type = result.isTaxpayerQualified
          ? "qualified"
          : "modifiedAGIDisqualification";
        const residenceHistoryStateKeys = getSelectedStateAbbreviations(state)
          .nonExpansion;
        const taxYear = state.taxpayerReturn.taxYear;
        store.dispatch({
          type: types.UPDATE_RESULT,
          result: Object.assign(
            { type, residenceHistoryStateKeys, taxYear },
            result
          )
        });
        return;
      }
    }

    if (
      hasNonZeroForeignEarnedIncome(state.taxpayerReturn) &&
      (state.ui.isVITAUser && !state.ui.hasOutOfScopeOverride)
    ) {
      store.dispatch({
        type: types.UPDATE_RESULT,
        result: {
          type: "outOfVITAScopeDisqualification"
        }
      });
      return;
    }
  }

  return next(action);
};

export function hasNonZeroForeignEarnedIncome({
  foreignEarnedIncome,
  dependents
}) {
  if (hasNonZeroValue(foreignEarnedIncome)) return true;
  if (!dependents) return false;
  return !!dependents.find(dependent =>
    hasNonZeroValue(dependent.foreignEarnedIncome)
  );
}

function hasNonZeroValue(val) {
  const parsed = parseInt(val, 10);
  if (isNaN(parsed)) return false;
  return parsed !== 0;
}

export function isStateDisqualification(
  taxYear,
  residenceHistory,
  isConfirmedSingleState = false
) {
  if (residenceHistory.length === 0) return false;

  const selectedStates = residenceHistory
    .filter(state => state.months.length !== 0 || isConfirmedSingleState)
    .map(state => state.stateAbbreviation);

  const invalidSelectedStates = selectedStates.filter(
    state => statesThatDidNotExpandMedicaid[taxYear].indexOf(state) === -1
  );
  return (
    selectedStates.length !== 0 &&
    selectedStates.length === invalidSelectedStates.length
  );
}
