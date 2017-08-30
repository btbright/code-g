import React from "react";
import NavigationButton from "./NavigationButton.jsx";

export default props =>
  <NavigationButton
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    isHidden={props.isHidden}
    isPrimary={false}
    text="Back"
  />;
