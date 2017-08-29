import React from "react";
import classnames from "classnames";
import states, { statesThatDidNotExpandMedicare } from "../constants/states";
import '../styles/qualification.css';

function getStates(residenceHistoryStateKeys){
  return statesThatDidNotExpandMedicare.map((stateKey, i) => {
    const stateName = states[stateKey];
    const isResidenceState = residenceHistoryStateKeys.indexOf(stateKey) !== -1
    const isFirst = i === 0
    const isLast = i === statesThatDidNotExpandMedicare.length - 1
    const prefix = isLast ? ', or ' : (isFirst ? '' : ', ')
    return <span key={stateKey} className={classnames("state", isResidenceState && "residence-state")} >{prefix}{stateName}</span>
  })
}

const maybePluralizedState = stateKeys => stateKeys.length > 1 ? "states" : "a state"
const joinedStates = stateKeys => stateKeys.map(stateKey => states[stateKey]).join(", ")

export default props => <div className={classnames("result")}>
  <h1><span style={{color: "green"}}>&#x2714;</span>&nbsp;&nbsp;You Qualify</h1>
  <p>
    You can claim a coverage exemption for yourself or another
    member of your tax household for {props.taxYear} if:
  </p>
  <div className="qualification-section">
    <p className="requirement">
      Your household income is less than 138% of the federal
      poverty line for the number of individuals in your tax household,
      not including any dependents you didn't claim; and
    </p>
    <p className="status qualification-success">
      <span style={{color: "green"}}>&#x2714;</span>&nbsp;&nbsp;Since your household income is <strong>{props.fplPercentage}%</strong> of the federal poverty line, you meet this requirement.<br />
    </p>
  </div>
  <div className="qualification-section">
    <p className="requirement">
      At any time in {props.taxYear} the individual resided in {getStates(props.residenceHistoryStateKeys)}.
    </p>
    <p className="qualification-status qualification-success">
      <span style={{color: "green"}}>&#x2714;</span>&nbsp;&nbsp;Since you lived in {maybePluralizedState(props.residenceHistoryStateKeys)} that expanded medicaid, you meet this requirement.
    </p>
  </div>
</div>
