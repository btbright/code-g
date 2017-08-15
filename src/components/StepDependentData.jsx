import React, { Component } from "react";
import Step from './Step';
import Confirmation from "./Confirmation.jsx"
import Dependent from "./Dependent.jsx"

export default class StepDependentData extends Component {
  render() {
    const { updateDependentField, addDependent, removeDependent } = this.props.stepActions;
    const { nextStep } = this.props.navActions;
		const shouldDisplayConfirmation = this.props.taxpayerReturn.dependents.length === 0
    return (
      <Step>
				<div style={{display: shouldDisplayConfirmation ? "block" : "none"}}>
					<Confirmation
						prompt="8. Is the taxpayer claiming any dependents?"
            isBold={true}
						onResult={isClaimingDependents => isClaimingDependents ? addDependent() : nextStep()} />
				</div>
				<div style={{display: !shouldDisplayConfirmation ? "block" : "none"}}>
					{this.props.taxpayerReturn.dependents.map((dependent, i) => {
						return <Dependent
											key={i}
											index={i}
											dependent={dependent}
                      onRemove={removeDependent}
											invalidFields={this.props.ui.invalidFields}
											onFieldUpdate={updateDependentField} />
					})}
					<input type="button" value="Add another dependent" onClick={addDependent} />
				</div>
      </Step>
    );
  }
}
