import React, { Component } from "react";
import Step from '../Step';
import renderFieldSet from '../../fields/renderFieldSet.jsx'
import { decorateFieldsWithState } from '../../../reducers'

class FieldsStepComponent extends Component {
	render() {
    const { updateTaxpayerReturnField } = this.props.stepActions;
		const fields = decorateFieldsWithState(this.props.fields, this.props.taxpayerReturn, this.props.ui);
    return (
      <Step ui={this.props.ui}>
        {renderFieldSet(fields, updateTaxpayerReturnField)}
      </Step>
    );
  }
}

export default function FieldsStep(fields) {
  return props => <FieldsStepComponent fields={fields} {...props}/>
}
