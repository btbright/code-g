import React from "react";
import classnames from "classnames";

export default props => <div className={classnames("result")}>
                          <h1><span style={{color: "#ff9800"}}>&#9888;</span> Out Of Scope</h1>
                          <p>Since this return has foreign earned income, it is out of scope for VITA. You can continue with this return, but be aware... words words words</p>
                          <p><button className="u-pull-right" onClick={props.onOverrideOutOfScope}>Continue Return</button></p>
                        </div>
