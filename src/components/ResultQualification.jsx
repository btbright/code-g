import React from "react";
import classnames from "classnames";
import states, { statesThatDidNotExpandMedicare } from "../constants/states";
import { resultFields } from "../constants/taxpayerReturnFields";
import { isArray } from "lodash";
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

const renderFieldRow = (name, type, fieldValue, i) => {
  return (<tr key={i}>
            <td>{name}</td>
            <td colSpan={2} style={{textAlign: "right"}}>{type === "negative" ? `(${fieldValue})` : fieldValue}</td>
          </tr>);
}
const renderDependents = dependents => {
  const rows = []
  dependents.forEach((dependent, i) => {
    Object.keys(dependent).forEach((fieldKey, j) => {
      const fieldValue = dependent[fieldKey];
      if (fieldValue === 0) return
      const { name, type } = resultFields[fieldKey];
      rows.push(renderFieldRow(`Dependent #${i+1} - ${name}`, type, fieldValue, `${i}-${j}`));
    })
  })
  return rows;
}

const dependentsSort = (a,b) => {
  if (a !== "dependents" && b !== "dependents"){
    return 0;
  }
  if (a === "dependents"){
    return 1;
  }
  return -1;
}

export default props => <div className={classnames("result")}>
  <h1><span style={{color: "green"}}>&#x2714;</span>&nbsp;&nbsp;You Qualify</h1>
  <p>
    You can claim a coverage exemption for yourself or another
    member of your tax household for {props.taxYear} if:
  </p>
  <div className="qualification-section">
    <p className="requirement">
      1) Your household income is less than 138% of the federal
      poverty line for the number of individuals in your tax household,
      not including any dependents you didn't claim; and
    </p>
    <p className="status qualification-success">
      <span style={{color: "green"}}>&#x2714;</span>&nbsp;&nbsp;Since your household income is <strong>{props.fplPercentage}%</strong> of the federal poverty line, you meet this requirement.<br />
    </p>
    <table className="u-full-width taxpayer-fields">
      <thead>
        <tr>
          <th colSpan={3}>Return Fields</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(resultFields).sort(dependentsSort).map((fieldKey, i) => {
          const fieldValue = props.parsedTaxpayerReturn[fieldKey];
          if (fieldValue === 0) return null
          if (isArray(fieldValue)){
            return renderDependents(fieldValue);
          }
          const { name, type } = resultFields[fieldKey];
          return renderFieldRow(name, type, fieldValue, i);
        })}

        <tr className="total-row">
          <td>Total Household Modified AGI</td>
          <td colSpan={2} style={{textAlign: "right"}}>{props.modifiedAGI}</td>
        </tr>
        <tr className="total-row">
          <td>Federal Poverty Line Reference</td>
          <td>for {props.numberOfPeopleInTaxHousehold} people</td>
          <td style={{textAlign: "right"}}>{props.referenceFPL}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="qualification-section">
    <p className="requirement">
      2) At any time in {props.taxYear} the individual resided in {getStates(props.residenceHistoryStateKeys)}.
    </p>
    <p className="qualification-status qualification-success">
      <span style={{color: "green"}}>&#x2714;</span>&nbsp;&nbsp;Since you lived in {maybePluralizedState(props.residenceHistoryStateKeys)} that expanded medicaid, you meet this requirement.
    </p>
  </div>
</div>
