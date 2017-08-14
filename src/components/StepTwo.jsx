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
          errorText={"Must be a valid number (no commas)"}
          prompt="3. Enter AGI (Form 1040, Line 37 or 38)"
          placeholder="AGI..." />
        <ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.taxExemptInterest}
          value={this.props.taxpayerReturn[taxpayerReturnFields.taxExemptInterest]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.taxExemptInterest) !== -1}
          errorText={"Must be a valid number (no commas)"}
          prompt="4. Enter tax-exempt interest (Form 1040, Line 8b)"
          placeholder="Tax exempt interest..." />
        {
          //if any foreign earned income, result page that out of scope for VITA
        }
        <ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.foreignEarnedIncome}
          value={this.props.taxpayerReturn[taxpayerReturnFields.foreignEarnedIncome]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.foreignEarnedIncome) !== -1}
          errorText={"Must be a valid number (no commas)"}
          prompt="5. Enter foreign earned income (Form 2555, Line 45 + Line 50)"
          placeholder="Foreign earned income..." />
        <ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.socialSecurityBenefitsTotal}
          value={this.props.taxpayerReturn[taxpayerReturnFields.socialSecurityBenefitsTotal]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.socialSecurityBenefitsTotal) !== -1}
          errorText={"Must be a valid number (no commas)"}
          prompt="6. Enter total amount of social security benefits (Form 1040, Line 20a)"
          placeholder="Total social security benefits..." />
        <ReturnField
          onChange={updateTaxpayerReturnField}
          fieldName={taxpayerReturnFields.socialSecurityBenefitsTaxable}
          value={this.props.taxpayerReturn[taxpayerReturnFields.socialSecurityBenefitsTaxable]}
          hasError={this.props.ui.invalidFields.indexOf(taxpayerReturnFields.socialSecurityBenefitsTaxable) !== -1}
          errorText={"Must be a valid number (no commas)"}
          prompt="7. Enter taxable social security benefits (Form 1040, Line 20b)"
          placeholder="Taxable social security benefits..." />
      </Step>
    );
  }
}
