import React from "react";
import classnames from "classnames";

export default props =>
  <div className={classnames("vita-confirmation", props.isHidden && "hidden")}>
    <label
      onClick={e => {
        e.preventDefault();
        props.onVitaConfirmation();
      }}
    >
      <input type="checkbox" checked={props.isVITAUser} readOnly />{" "}
      <span className="label-body">For VITA?</span>
    </label>
  </div>;
