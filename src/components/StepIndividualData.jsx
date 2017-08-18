import React, { Component } from "react";
import Step from './Step';
import ReturnField from "./ReturnField.jsx"
import { individualDataFields } from '../constants/steps'

export default class StepIndividualData extends Component {
  render() {
    const { updateTaxpayerReturnField } = this.props.stepActions;
    return (
      <Step>
        {individualDataFields.map(step => {
          return <ReturnField
                    onChange={updateTaxpayerReturnField}
                    fieldName={step.fieldName}
                    value={this.props.taxpayerReturn[step.fieldName]}
                    hasError={this.props.ui.invalidFields.indexOf(step.fieldName) !== -1}
                    errorText={"Must be a valid number (no commas)"}
                    prompt={step.promptText}
                    placeholder={step.placeholder} />
        })}
      </Step>
    );
  }
}
