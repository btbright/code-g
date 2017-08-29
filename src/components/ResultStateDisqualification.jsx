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

export default props => <div className={classnames("result")}>
  <h1><span style={{color: "red"}}>&#x2716;</span>&nbsp;&nbsp;You Do Not Qualify</h1>
  <p>
    You can claim a coverage exemption for yourself or another
    member of your tax household for {props.taxYear} if:
  </p>
  <div className="qualification-section">
    <p className="requirement">
      At any time in {props.taxYear} the individual resided in {getStates([])}.
    </p>
    <p className="qualification-status qualification-success">
      <span style={{color: "red"}}>&#x2716;</span>&nbsp;&nbsp;Since you did not live in a state that expanded medicaid, you do not meet this requirement.
    </p>
  </div>
</div>
