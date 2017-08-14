import React from "react";
import classnames from "classnames";

export default props => <div className={classnames("return-field", props.hasError && "error")}>
                          <label htmlFor={props.fieldName}>
                            {props.prompt}
                          </label>
                          <p className="error">{props.errorText || "Invalid input"}</p>
                          <input
                            className="u-full-width"
                            type="text"
                            onChange={e => props.onChange(props.fieldName, e.target.value.trim())}
                            placeholder={props.placeholder}
                            id={props.fieldName}
                            value={props.value}/>
                        </div>
