import React, { Component } from "react";
import classnames from "classnames";
import StateRequirementResults from "./StateRequirementResults.jsx";
import MAGIRequirementResults from "./MAGIRequirementResults.jsx";
import "../../styles/qualification.css";

const SuccessResultHeader = props => (
  <h1>
    <span style={{ color: "green" }}>&#x2714;</span>&nbsp;&nbsp;You Qualify
  </h1>
);
const FailureResultHeader = props => (
  <h1>
    <span style={{ color: "red" }}>&#x2716;</span>&nbsp;&nbsp;You Do Not Qualify
  </h1>
);

export default class QualificationResults extends Component {
  render() {
    const ResultHeader = this.props.isTaxpayerQualified
      ? SuccessResultHeader
      : FailureResultHeader;

    return (
      <div className={classnames("result")}>
        <ResultHeader />
        <p>
          You can claim a coverage exemption for yourself or another member of
          your tax household for {this.props.taxYear} if:
        </p>
        <MAGIRequirementResults {...this.props} />
        <StateRequirementResults {...this.props} />
      </div>
    );
  }
}
