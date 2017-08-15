import React from "react";
import classnames from "classnames";

export default props =>
  <div className="nav-status">
    {new Array(props.numberOfSteps + 1).fill(1).map((x, i) =>
      <div
        key={i}
        onClick={e => props.onClick(i + 1)}
        className={classnames("dot", props.activeStep === i + 1 && "active")}
      >
        {i + 1}
      </div>
    )}
  </div>;
