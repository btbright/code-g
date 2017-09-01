import React from "react";
import classnames from "classnames";

export default props =>
  <div className={classnames("vita-confirmation", props.isHidden && "hidden")}>
    <div
      onClick={e => {
        props.onVitaConfirmation();
      }}
    >
      <input type="checkbox" checked={props.isVITAUser} readOnly />{" "}
      <span className="label-body">For VITA?</span>
    </div>
  </div>;
