import * as types from "../actions/action-types";
import stepFields from "../constants/steps";
import { isArray, difference, flatten, uniq } from "lodash";

export default store => next => action => {
  const state = store.getState();

  //only validate if we're going forward to a step
  //we haven't been to before
  if (
    action.type !== types.UPDATE_STEP ||
    action.increment < 0 ||
    action.step < state.ui.step
  )
    return next(action);

  //get curret step fields w/ validation requirements
  const currentStepFields = stepFields[state.ui.step];
  if (!currentStepFields) return next(action);

  //get validation errors
  const requiredFields = currentStepFields.filter(field => field.isRequired);
  const invalidlyMissingValueFieldNames = requiredFields.reduce(
    (invalidFieldNames, field) => {
      //check all dependents
      if (state.ui.step === 3) {
        state.taxpayerReturn.dependents.forEach((dependent, i) => {
          if (isEmptyValue(dependent[field.fieldName])) {
            invalidFieldNames.push(`dependent:${i}:${field.fieldName}`);
          }
        });
      } else if (
        field.fieldName === "residenceHistory" &&
        isResidenceHistoryIncomplete(state.taxpayerReturn[field.fieldName])
      ) {
        invalidFieldNames.push(field.fieldName);
      } else {
        if (isEmptyValue(state.taxpayerReturn[field.fieldName])) {
          invalidFieldNames.push(field.fieldName);
        }
      }
      return invalidFieldNames;
    },
    []
  );

  const validFields = difference(
    requiredFields.map(field => field.fieldName),
    invalidlyMissingValueFieldNames
  );

  if (validFields.length !== 0) {
    store.dispatch({
      type: types.REMOVE_INVALID_FIELDS,
      fieldNames: validFields
    });
  }

  //update step validation errors
  if (invalidlyMissingValueFieldNames.length !== 0) {
    store.dispatch({
      type: types.ADD_INVALID_FIELDS,
      errors: invalidlyMissingValueFieldNames.map(fieldName => ({
        fieldName,
        errorText: "Field is required"
      }))
    });
    return;
  }

  return next(action);
};

function isResidenceHistoryIncomplete(residenceHistory) {
  if (!residenceHistory || residenceHistory.length === 0) return true;
  const uniqueSelectedMonths = uniq(
    flatten(residenceHistory.map(s => s.months))
  );
  return uniqueSelectedMonths.length !== 12;
}

function isEmptyValue(fieldValue) {
  if (fieldValue === "" || typeof fieldValue === "undefined") return true;
  if (isArray(fieldValue) && fieldValue.length === 0) return true;
  return false;
}
