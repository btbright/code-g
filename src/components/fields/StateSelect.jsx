import React from "react";
import states from "../../constants/states";
import { difference } from "lodash";
import "../../styles/StateSelect.css";

export default props => {
  const dynamicAttributes = {};
  if (!props.isEnabled){
    dynamicAttributes["disabled"] = "disabled";
  }
  return (
    <select
      value={props.selectedStateAbbreviation}
      onChange={e => props.onChange && props.onChange(e.target.value)}
      className="state-select u-full-width"
      {...dynamicAttributes}
    >
      <option value="">{props.selectText || "Select State"}</option>
      {difference(Object.keys(states), props.statesToExclude).map(
        stateAbbreviation => (
          <option key={stateAbbreviation} value={stateAbbreviation}>
            {states[stateAbbreviation]}
          </option>
        )
      )}
    </select>
  );
};
