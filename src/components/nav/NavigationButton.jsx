import React from "react";
import classnames from "classnames";

export default props =>
  <div
    className={classnames(
      "button",
      props.isDisabled && "button-disabled",
      props.isPrimary && "button-primary",
      props.isHidden && "button-hidden"
    )}
    onClick={props.onClick}
  >
    {props.text}
  </div>;
