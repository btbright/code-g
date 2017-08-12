import React, { Component } from "react";
import taxpayerReturnFields from "../constants/taxpayerReturnFields";
import ReturnField from "./ReturnField.jsx";
import "../styles/Dependent.css";

export default class Dependent extends Component {
	handleFieldUpdate = (fieldName, fieldValue) => {
		this.props.onFieldUpdate(this.props.index, fieldName, fieldValue);
	}
  render() {
    return (
      <div className="dependent">
				<h1 style={{fontSize: '2rem'}}>Dependent #{this.props.index+1}</h1>
				<ReturnField
					fieldName={taxpayerReturnFields.AGI}
					prompt="1. Enter dependent’s AGI (Line 37)"
					placeholder="AGI..."
					value={this.props.dependent[taxpayerReturnFields.AGI]}
					onChange={this.handleFieldUpdate} />
				<ReturnField
					fieldName={taxpayerReturnFields.socialSecurityBenefitsTotal}
					prompt="2. Enter dependent’s total amount of social security benefits (Line 20a)"
					placeholder="Social security benefits total"
					value={this.props.dependent[taxpayerReturnFields.socialSecurityBenefitsTotal]}
					onChange={this.handleFieldUpdate} />
				<ReturnField
					fieldName={taxpayerReturnFields.socialSecurityBenefitsTaxable}
					prompt="3. Enter dependent’s taxable social security benefits (Line 20b)"
					placeholder="Social security benefits total"
					value={this.props.dependent[taxpayerReturnFields.socialSecurityBenefitsTaxable]}
					onChange={this.handleFieldUpdate} />
			</div>
    );
  }
}
