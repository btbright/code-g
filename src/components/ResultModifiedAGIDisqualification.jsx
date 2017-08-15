import React from "react";
import classnames from "classnames";

export default props => <div className={classnames("result")}>
                          <h1>{`Since you are at ${props.fplPercentage}% of the federal poverty line, you do not qualify for the Code G exemption`}</h1>
                        </div>
