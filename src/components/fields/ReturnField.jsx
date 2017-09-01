import React from "react";
import classnames from "classnames";

export default props =>
  <div className={classnames("return-field", props.hasError && "error")}>
    <label htmlFor={props.fieldName}>
      {props.promptText}
    </label>
    <p className="error">
      {props.errorText}
    </p>
    {props.helperText &&
      <p className="helper-text">
        {props.helperText}
      </p>}
    <input
      className="u-full-width"
      type="text"
      onChange={e => props.onChange(props.fieldName, e.target.value.trim())}
      placeholder={props.placeholder}
      id={props.fieldName}
      value={props.value}
    />
  </div>;
