import React from "react";
import { isArray } from "lodash";
import classnames from "classnames";
import { resultFields } from "../../constants/taxpayerReturnFields";

export default props => {
  return (
    <div className="qualification-section">
      <p className="requirement">
        1) Your household income is less than 138% of the federal poverty line
        for the number of individuals in your tax household, not including any
        dependents you didn't claim; and
      </p>
      {props.fplPercentage && <ResultsBody {...props} />}
    </div>
  );
};

const MeetsRequirementHeader = ({ fplPercentage }) =>
  <p className="status qualification-success">
    <span style={{ color: "green" }}>&#x2714;</span>&nbsp;&nbsp;Since your
    household income is <strong>{fplPercentage}%</strong> of the federal poverty
    line, you meet this requirement.<br />
  </p>;

const DoesNotMeetRequirementHeader = ({ fplPercentage }) =>
  <p className="status qualification-failure">
    <span style={{ color: "red" }}>&#x2716;</span>&nbsp;&nbsp;Since your
    household income is <strong>{fplPercentage}%</strong> of the federal poverty
    line, you do not meet this requirement.<br />
  </p>;

const ResultsBody = props => {
  const RequirementResultsHeader = props.isTaxpayerQualified
    ? MeetsRequirementHeader
    : DoesNotMeetRequirementHeader;
  return (
    <div>
      <RequirementResultsHeader fplPercentage={props.fplPercentage} />
      <button className="toggle-calculations" onClick={props.onToggleCalculations}>{props.ui.showReturnFields ? "Hide Calculations" : "Show Calculations"}</button>
      <table className={classnames("u-full-width", "taxpayer-fields", props.ui.showReturnFields && "show")}>
        <thead>
          <tr>
            <th colSpan={3}>Return Fields</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(resultFields).sort(dependentsSort).map((fieldKey, i) => {
            const fieldValue = props.parsedTaxpayerReturn[fieldKey];
            if (fieldValue === 0) return null;
            if (isArray(fieldValue)) {
              return renderDependents(fieldValue);
            }
            const { name, type } = resultFields[fieldKey];
            return renderFieldRow(name, type, fieldValue, i);
          })}

          <tr className="total-row">
            <td>Total Household Modified AGI</td>
            <td colSpan={2} style={{ textAlign: "right" }}>
              {props.modifiedAGI}
            </td>
          </tr>
          <tr className="total-row">
            <td>Federal Poverty Line Reference</td>
            <td>
              for {props.numberOfPeopleInTaxHousehold} {props.numberOfPeopleInTaxHousehold === "1" ? "person" : "people"}
            </td>
            <td style={{ textAlign: "right" }}>
              {props.referenceFPL}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const renderFieldRow = (name, type, fieldValue, i) => {
  return (
    <tr key={i}>
      <td>
        {name}
      </td>
      <td colSpan={2} style={{ textAlign: "right" }}>
        {type === "negative" ? `(${fieldValue})` : fieldValue}
      </td>
    </tr>
  );
};
const renderDependents = dependents => {
  const rows = [];
  dependents.forEach((dependent, i) => {
    Object.keys(dependent).forEach((fieldKey, j) => {
      const fieldValue = dependent[fieldKey];
      if (fieldValue === 0) return;
      const { name, type } = resultFields[fieldKey];
      rows.push(
        renderFieldRow(
          `Dependent #${i + 1} - ${name}`,
          type,
          fieldValue,
          `${i}-${j}`
        )
      );
    });
  });
  return rows;
};

const dependentsSort = (a, b) => {
  if (a !== "dependents" && b !== "dependents") {
    return 0;
  }
  if (a === "dependents") {
    return 1;
  }
  return -1;
};
