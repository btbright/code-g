import React, { Component } from "react";
import Step from './Step';
import taxpayerReturnFields from "../constants/taxpayerReturnFields";
import ReturnField from "./ReturnField.jsx"

export default class StepThree extends Component {
  render() {
    const { updateTaxpayerReturnField } = this.props.stepActions;
    return (
      <Step>
        <ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.foreignEarnedIncome}
          value={this.props.taxpayerReturn[taxpayerReturnFields.foreignEarnedIncome]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.foreignEarnedIncome) !== -1}
          errorText={"Must be a valid number"}
          prompt="5. Enter foreign earned income (Form 2555, Line 45 + Line 50)"
          placeholder="Foreign earned income..." />
        <ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.socialSecurityBenefitsTotal}
          value={this.props.taxpayerReturn[taxpayerReturnFields.socialSecurityBenefitsTotal]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.socialSecurityBenefitsTotal) !== -1}
          errorText={"Must be a valid number"}
          prompt="6. Enter total amount of social security benefits (Line 20a)"
          placeholder="Social security benefits total..." />
        <ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.socialSecurityBenefitsTaxable}
          value={this.props.taxpayerReturn[taxpayerReturnFields.socialSecurityBenefitsTaxable]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.socialSecurityBenefitsTaxable) !== -1}
          errorText={"Must be a valid number"}
          prompt="7. Enter dependent’s taxable social security benefits (Line 20b)"
          placeholder="Social security benefits taxable..." />
      </Step>
    );
  }
}
