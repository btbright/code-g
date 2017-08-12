import React, { Component } from "react";
import Step from './Step';
import taxpayerReturnFields from "../constants/taxpayerReturnFields";
import Confirmation from "./Confirmation.jsx"
import Dependent from "./Dependent.jsx"

export default class StepFour extends Component {
  render() {
    const { updateTaxpayerReturnField, updateDependentField, addDependent } = this.props.stepActions;
		const shouldDisplayConfirmation = typeof this.props.taxpayerReturn.isClaimingDependents === "undefined"
    return (
      <Step>
				<div style={{display: shouldDisplayConfirmation ? "block" : "none"}}>
					<Confirmation
						prompt="Is the taxpayer claiming any dependents?"
						onResult={updateTaxpayerReturnField.bind(null, taxpayerReturnFields.isClaimingDependents)} />
				</div>
				<div style={{display: !shouldDisplayConfirmation ? "block" : "none"}}>
					{this.props.taxpayerReturn.dependents.map((dependent, i) => {
						return <Dependent
											key={i}
											index={i}
											dependent={dependent}
											onFieldUpdate={updateDependentField} />
					})}
					<input type="button" value="Add another dependent" onClick={addDependent} />
				</div>
      </Step>
    );
  }
}
