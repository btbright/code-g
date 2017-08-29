import React from "react";
import classnames from "classnames";

export default props => <div className={classnames("result")}>
  <h1><span style={{color: "red"}}>&#x2716;</span>&nbsp;&nbsp;You Do Not Qualify</h1>
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
    <p className="status">
      <span style={{color: "red"}}>&#x2716;</span>&nbsp;&nbsp;Since your household income is <strong>{props.fplPercentage}%</strong> of the federal poverty line, you do not meet this requirement.<br />
    </p>
  </div>
</div>
