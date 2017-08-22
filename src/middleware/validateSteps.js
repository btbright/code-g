import * as types from "../actions/action-types";
import stepFields from "../constants/steps";
import { isArray, difference } from "lodash";

export default store => next => action => {
  const state = store.getState();

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
      if (isEmptyValue(state.taxpayerReturn[field.fieldName])) {
        invalidFieldNames.push(field.fieldName);
      }
      return invalidFieldNames;
    },
    []
  );

  const validFields = difference(requiredFields.map(field => field.fieldName), invalidlyMissingValueFieldNames);

  console.log("validFields", validFields)
  if (validFields.length !== 0){
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

function isEmptyValue(fieldValue) {
  if (fieldValue === "") return true;
  if (isArray(fieldValue) && fieldValue.length === 0) return true;
  return false;
}
