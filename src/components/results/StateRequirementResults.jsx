import React from "react";
import classnames from "classnames";
import states, { statesThatDidNotExpandMedicare } from "../../constants/states";

const MeetsRequirementsResults = ({ residenceHistoryStateKeys }) =>
  <p className="qualification-status qualification-success">
    <span style={{ color: "green" }}>&#x2714;</span>&nbsp;&nbsp;Since you lived
    in {maybePluralizedState(residenceHistoryStateKeys)} that did not expand medicaid,
    you meet this requirement.
  </p>;

const DoesNotMeetRequirementsResults = props =>
  <p className="qualification-status">
    <span style={{ color: "red" }}>&#x2716;</span>&nbsp;&nbsp;Since you did lived in a state
    that expanded medicaid, you do not meet this requirement.
  </p>;

export default props => {
  const Results =
    props.residenceHistoryStateKeys &&
    props.residenceHistoryStateKeys.length !== 0
      ? MeetsRequirementsResults
      : DoesNotMeetRequirementsResults;
  return (
    <div className="qualification-section">
      <p className="requirement">
        2) At any time in {props.taxYear} the individual resided in{" "}
        {getStates(props.residenceHistoryStateKeys)}.
      </p>
      <Results residenceHistoryStateKeys={props.residenceHistoryStateKeys} />
    </div>
  );
};

function getStates(residenceHistoryStateKeys) {
  return statesThatDidNotExpandMedicare.map((stateKey, i) => {
    const stateName = states[stateKey];
    const isResidenceState =
      (residenceHistoryStateKeys || []).indexOf(stateKey) !== -1;
    const isFirst = i === 0;
    const isLast = i === statesThatDidNotExpandMedicare.length - 1;
    const prefix = isLast ? ", or " : isFirst ? "" : ", ";
    return (
      <span
        key={stateKey}
        className={classnames("state", isResidenceState && "residence-state")}
      >
        {prefix}
        {stateName}
      </span>
    );
  });
}

const maybePluralizedState = stateKeys =>
  stateKeys.length > 1 ? "states" : "a state";
