import React from "react";
import classnames from "classnames";

export default props => <div className={classnames("result")}>
                          <h1>{`Since you are at ${props.fplPercentage}% of the federal poverty line, you qualify for the Code G exemption because you lived in ${props.stateNames.length > 1 ? 'states':'a state'} (${props.stateNames.join(", ")}) that did not for the expand Medicaid for the following months:`}</h1>
                          <ul>
                            {props.months.map(month => <li key={month}>{month}</li>)}
                          </ul>
                        </div>
