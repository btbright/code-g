import React from "react";

export default props => <div>
                          <label htmlFor={props.fieldName}>
                            {props.prompt}
                          </label>
                          <input
                            className="u-full-width"
                            type="text"
                            onChange={e => props.onChange(props.fieldName, e.target.value.trim())}
                            placeholder={props.placeholder}
                            id={props.fieldName}
                            value={props.value}/>
                        </div>
