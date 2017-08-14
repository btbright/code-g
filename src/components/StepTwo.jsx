import React, { Component } from "react";
import Step from './Step';
import taxpayerReturnFields from "../constants/taxpayerReturnFields";
import ReturnField from "./ReturnField.jsx"

export default class StepTwo extends Component {
  render() {
    const { updateTaxpayerReturnField } = this.props.stepActions;
    return (
      <Step>
        <ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.AGI}
          value={this.props.taxpayerReturn[taxpayerReturnFields.AGI]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.AGI) !== -1}
          errorText={"Must be a valid number"}
          prompt="3. Enter AGI (Line 37)"
          placeholder="AGI..." />
        <ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.taxExemptInterest}
          value={this.props.taxpayerReturn[taxpayerReturnFields.taxExemptInterest]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.taxExemptInterest) !== -1}
          errorText={"Must be a valid number"}
          prompt="4. Enter tax-exempt interest (Line 8b)"
          placeholder="Tax exempt interest..." />
      </Step>
    );
  }
}
