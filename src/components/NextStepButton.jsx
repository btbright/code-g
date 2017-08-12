import React from "react";
import NavigationButton from './NavigationButton.jsx';

export default props => <div style={{float:"right"}}>
													<NavigationButton
														onClick={props.onClick}
														isDisabled={props.isDisabled}
														isPrimary={true}
														text="Next" />
												</div>
