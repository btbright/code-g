import React, { Component } from "react";
import Step from "../Step";
import Confirmation from "../../fields/Confirmation.jsx";
import Dependent from "../Dependent.jsx";

export default class StepDependentData extends Component {
  render() {
    const {
      updateDependentField,
      addDependent,
      removeDependent
    } = this.props.stepActions;
    const { nextStep } = this.props.navActions;
    const shouldDisplayConfirmation =
      this.props.taxpayerReturn.dependents.length === 0;
    return (
      <Step>
        <div style={{ display: shouldDisplayConfirmation ? "block" : "none" }}>
          <Confirmation
            prompt="8. Is the taxpayer claiming any dependents with a filing requirement?"
            isBold={true}
            onResult={isClaimingDependents =>
              isClaimingDependents ? addDependent() : nextStep()}
          />
          <p style={{ color: "#999" }}>
            Note: dependents have a filing requirement if they must file a
            return based on earned and/or unearned income. If a dependent is not
            required to file a return but elects to file to get back
            withholding, do not answer yes. Consult Pub 4012 A-2 for dependent
            filing requirements.
          </p>
        </div>
        <div style={{ display: !shouldDisplayConfirmation ? "block" : "none" }}>
          {this.props.taxpayerReturn.dependents.map((dependent, i) => {
            return (
              <Dependent
                key={i}
                index={i}
                dependent={dependent}
                onRemove={removeDependent}
                invalidFields={this.props.ui.invalidFields}
                onFieldUpdate={updateDependentField}
              />
            );
          })}
          <input
            type="button"
            value="Add another dependent"
            onClick={addDependent}
          />
        </div>
      </Step>
    );
  }
}
