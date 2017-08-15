import React from "react";
import classnames from "classnames";
import states from "../constants/states"

export default props => {
  const maybePluralizedState = props.taxpayerReturn.residenceHistory.length > 1 ? "states" : "a state"
  const joinedStates = props.taxpayerReturn.residenceHistory.map(state => states[state.stateAbbreviation]).join(", ")
  return (
    <div className={classnames("result")}>
      <h1>
        {`You do not qualify for a Code G exemption because you lived in ${maybePluralizedState} that expanded medicaid: ${joinedStates}`}
      </h1>
    </div>
  );
};
