import React from "react";
import classnames from "classnames";

export default props => <div className={classnames("result")}>
                          <h1>{`You do not qualify for a Code G exemption because you lived in ${props.taxpayerReturn.residenceHistory.length > 1 ? 'states':'a state'} that expanded medicaid`}</h1>
                        </div>
