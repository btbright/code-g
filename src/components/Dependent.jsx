import React, { Component } from "react";
import taxpayerReturnFields from "../constants/taxpayerReturnFields";
import ReturnField from "./ReturnField.jsx";
import "../styles/Dependent.css";

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
					hasError={this.props.invalidFields.indexOf(`dependent:${this.props.index}:${taxpayerReturnFields.AGI}`) !== -1}
					errorText={"Must be a valid number (no commas)"}
					onChange={this.handleFieldUpdate} />
				<ReturnField
					fieldName={taxpayerReturnFields.socialSecurityBenefitsTotal}
					promptText="2. Enter dependent’s total amount of social security benefits (Form 1040, Line 20a)"
					placeholder="Taxable social security benefits..."
					value={this.props.dependent[taxpayerReturnFields.socialSecurityBenefitsTotal]}
					hasError={this.props.invalidFields.indexOf(`dependent:${this.props.index}:${taxpayerReturnFields.socialSecurityBenefitsTotal}`) !== -1}
					errorText={"Must be a valid number (no commas)"}
					onChange={this.handleFieldUpdate} />
				<ReturnField
					fieldName={taxpayerReturnFields.socialSecurityBenefitsTaxable}
					promptText="3. Enter dependent’s taxable social security benefits (Form 1040, Line 20b)"
					placeholder="Taxable social security benefits..."
					value={this.props.dependent[taxpayerReturnFields.socialSecurityBenefitsTaxable]}
					hasError={this.props.invalidFields.indexOf(`dependent:${this.props.index}:${taxpayerReturnFields.socialSecurityBenefitsTaxable}`) !== -1}
					errorText={"Must be a valid number (no commas)"}
					onChange={this.handleFieldUpdate} />
			</div>
    );
  }
}
