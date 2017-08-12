import React from "react";
import NavigationButton from './NavigationButton.jsx';

export default props => <div style={{float:"left"}}>
													<NavigationButton
														onClick={props.onClick}
														isDisabled={props.isDisabled}
														isHidden={props.isHidden}
														isPrimary={false}
														text="Back" />
												</div>
