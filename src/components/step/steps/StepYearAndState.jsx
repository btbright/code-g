import React, { Component } from "react";
import { times, difference } from "lodash";
import taxpayerReturnFields from "../../../constants/taxpayerReturnFields";
import { federalPovertyLineLevels } from "../../../constants/federalPovertyLineData"
import { yearAndStateFields } from "../../../constants/steps";
import { decorateFieldsWithState } from "../../../reducers";
import classnames from 'classnames';
import '../../../styles/StepYearAndState.css';

import StateResidenceForm from "../../fields/StateResidenceForm.jsx";

function getTaxYears() {
  return Object.keys(federalPovertyLineLevels).map(year => parseInt(year, 10)).reverse()
}

export default class StepYearAndState extends Component {
	handleReturnFieldUpdate = fieldName => e => {
    this.props.stepActions.updateTaxpayerReturnField(fieldName, e.target.value)
  }
  handleMonthSelect = stateIndex => monthId => this.props.stepActions.selectStateMonth(stateIndex, monthId)
  handleStateSelect = stateIndex => stateAbbreviation => {
    !!stateAbbreviation ?
          this.props.stepActions.selectState(stateAbbreviation, stateIndex) :
          this.props.stepActions.removeState(stateIndex)
  }
  render() {
		const numberOfStatesToShow = typeof this.props.ui.isConfirmedSingleState === "undefined" || this.props.ui.isConfirmedSingleState === true ? 1 : this.props.taxpayerReturn.residenceHistory.length + 1
    const [ taxYearField, residenceHistoryField ] = decorateFieldsWithState(yearAndStateFields, this.props.taxpayerReturn, this.props.ui);

    return (
			<div className="step">
				<div className={classnames("return-field", taxYearField.hasError && "error")}>
					<label htmlFor="selectTaxYear">
						{taxYearField.promptText}
					</label>
          <p className="error">{taxYearField.errorText}</p>
					<select
						onChange={this.handleReturnFieldUpdate(taxpayerReturnFields.taxYear)}
						value={this.props.taxpayerReturn.taxYear}
						id="selectTaxYear"
					>
						<option value="">{taxYearField.placeholder}</option>
						{getTaxYears().map(year =>
							<option key={year} value={year}>
								{year}
							</option>
						)}
					</select>
				</div>
				<div className={classnames("return-field", residenceHistoryField.hasError && "error")}>
					<label htmlFor="taxYearStates">
						{residenceHistoryField.promptText} <span style={{opacity: this.props.taxpayerReturn.residenceHistory.length === 0 ? 0 : 1}} className="reset-link" onClick={this.props.stepActions.resetResidenceHistory}>reset</span>
					</label>
          <p className="error">{residenceHistoryField.errorText}</p>
					<div id="taxYearStates">
						{times(numberOfStatesToShow, i => {
							const state = this.props.taxpayerReturn.residenceHistory[i]
							const shouldPromptConfirmation = i === 0 && state && state.stateAbbreviation && typeof this.props.ui.isConfirmedSingleState === "undefined"
							const shouldShowMonthSelection = (i !== 0 && state && !!state.stateAbbreviation) ||  (i===0 && typeof this.props.ui.isConfirmedSingleState !== "undefined")
							const statesToExclude = difference(this.props.taxpayerReturn.residenceHistory.map(st => st.stateAbbreviation), state ? [state.stateAbbreviation] : [])
							return (
								<StateResidenceForm
									key={i}
									id={i}
									months={state ? state.months : []}
									statesToExclude={statesToExclude}
									onMonthSelect={this.handleMonthSelect(i)}
									onStateSelect={this.handleStateSelect(i)}
									selectStateText={i===0 ? "Select state" : "Select another"}
									onConfirmAdditionalStates={this.props.stepActions.confirmSingleState}
									selectedStateAbbreviation={state ? state.stateAbbreviation : "" }
									shouldShowMonthSelection={shouldShowMonthSelection}
									shouldPromptConfirmation={shouldPromptConfirmation}
								/>
							);
						})}
					</div>
				</div>
			</div>
    );
  }
}
