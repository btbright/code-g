import React from "react";
import classnames from "classnames";

export default props =>
  <div className={classnames("result")}>
    <h1>
      <span style={{ color: "#ff9800" }}>&#9888;</span> Out Of Scope
    </h1>
    <p>
      Since this return has foreign earned income, it is out of scope for VITA,
      unless you have International Certification. If you do not have
      International Certification, you must refer this taxpayer to a
      professional tax preparer.
    </p>
    <p className="result-controls">
      <button className="u-pull-right" onClick={props.onOverrideOutOfScope}>
        I am certified, continue return
      </button>
      <a href="#back" onClick={e => {e.preventDefault();props.onBack();}}>
        Back
      </a>
    </p>
  </div>;
