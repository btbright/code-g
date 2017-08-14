import React, { Component } from "react";
import Step from './Step';
import taxpayerReturnFields from "../constants/taxpayerReturnFields";
import ReturnField from "./ReturnField.jsx"

export default class StepFive extends Component {
  render() {
    const { updateTaxpayerReturnField } = this.props.stepActions;
    return (
      <Step>
				<ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.numberOfPeopleInTaxHousehold}
          value={this.props.taxpayerReturn[taxpayerReturnFields.numberOfPeopleInTaxHousehold]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.numberOfPeopleInTaxHousehold) !== -1}
          errorText={"Must be a valid integer"}
          prompt="9. How many people total are in the tax household? (Form 1040, Line 6d)"
          placeholder="Total people..." />
      </Step>
    );
  }
}
