import React from "react";
import states from "../constants/states";
import { difference } from 'lodash'

export default props =>
  <select
    value={props.selectedStateAbbreviation}
    onChange={e => props.onChange && props.onChange(e.target.value)}
    className="state-select u-full-width"
  >
    <option value="">
      {props.selectText || "Select State"}
    </option>
    {difference(Object.keys(states), props.statesToExclude).map(stateAbbreviation =>
      <option key={stateAbbreviation} value={stateAbbreviation}>
        {states[stateAbbreviation]}
      </option>
    )}
  </select>;
