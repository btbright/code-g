import React, { Component } from "react";
import taxpayerReturnFields from "../constants/taxpayerReturnFields";
import ReturnField from "./ReturnField.jsx";
import "../styles/Dependent.css";

function makeErrorKey(index, fieldName){
	return `dependent:${index}:${fieldName}`;
}

function hasError(invalidFields, index, fieldName){
	return !!invalidFields.find(field => field.fieldName === makeErrorKey(index, fieldName))
}

function getErrorText(invalidFields, index, fieldName){
	const error = invalidFields.find(field => field.fieldName === makeErrorKey(index, fieldName))
	if (!error) return "";
	return error.errorText;
}

export default class Dependent extends Component {
	handleFieldUpdate = (fieldName, fieldValue) => {
		this.props.onFieldUpdate(this.props.index, fieldName, fieldValue);
	}
	handleRemove = () => {
		this.props.onRemove(this.props.index);
	}
  render() {
    return (
      <div className="dependent">
				<h1 style={{fontSize: '2rem'}}>Dependent #{this.props.index+1} <span onClick={this.handleRemove} className="remove">remove</span></h1>
				<ReturnField
					fieldName={taxpayerReturnFields.AGI}
					promptText="1. Enter dependent’s AGI (Form 1040, Line 37 or 38)"
					placeholder="AGI..."
					value={this.props.dependent[taxpayerReturnFields.AGI]}
					hasError={hasError(this.props.invalidFields, this.props.index, taxpayerReturnFields.AGI)}
					errorText={getErrorText(this.props.invalidFields, this.props.index, taxpayerReturnFields.AGI)}
					onChange={this.handleFieldUpdate} />
				<ReturnField
					fieldName={taxpayerReturnFields.socialSecurityBenefitsTotal}
					promptText="2. Enter dependent’s total amount of social security benefits (Form 1040, Line 20a)"
					placeholder="Taxable social security benefits..."
					value={this.props.dependent[taxpayerReturnFields.socialSecurityBenefitsTotal]}
					hasError={hasError(this.props.invalidFields, this.props.index, taxpayerReturnFields.socialSecurityBenefitsTotal)}
					errorText={getErrorText(this.props.invalidFields, this.props.index, taxpayerReturnFields.socialSecurityBenefitsTotal)}
					onChange={this.handleFieldUpdate} />
				<ReturnField
					fieldName={taxpayerReturnFields.socialSecurityBenefitsTaxable}
					promptText="3. Enter dependent’s taxable social security benefits (Form 1040, Line 20b)"
					placeholder="Taxable social security benefits..."
					value={this.props.dependent[taxpayerReturnFields.socialSecurityBenefitsTaxable]}
					hasError={hasError(this.props.invalidFields, this.props.index, taxpayerReturnFields.socialSecurityBenefitsTaxable)}
					errorText={getErrorText(this.props.invalidFields, this.props.index, taxpayerReturnFields.socialSecurityBenefitsTaxable)}
					onChange={this.handleFieldUpdate} />
			</div>
    );
  }
}
