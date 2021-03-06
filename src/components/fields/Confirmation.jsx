import React from "react";

export default props =>
  <div>
    <label>
      {props.prompt}
    </label>
    <a
      onClick={e => {
        e.preventDefault();
        props.onResult(true);
      }}
      className="button confirmation-option"
      href="#yes"
    >
      Yes
    </a>
    <a
      onClick={e => {
        e.preventDefault();
        props.onResult(false);
      }}
      className="button confirmation-option"
      href="#no"
    >
      No
    </a>
  </div>;
