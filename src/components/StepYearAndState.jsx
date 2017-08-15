import React, { Component } from "react";
import { times, difference } from "lodash";
import taxpayerReturnFields from "../constants/taxpayerReturnFields";
import { federalPovertyLineLevels } from "../constants/federalPovertyLineData"
import '../styles/StepYearAndState.css';

import StateResidenceForm from "./StateResidenceForm.jsx";

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
    return (
			<div className="step">
				<div>
					<label htmlFor="selectTaxYear">
						1. For what tax year are you trying to claim this exemption?
					</label>
					<select
						onChange={this.handleReturnFieldUpdate(taxpayerReturnFields.taxYear)}
						value={this.props.taxpayerReturn.taxYear}
						id="selectTaxYear"
					>
						<option value="">----</option>
						{getTaxYears().map(year =>
							<option key={year} value={year}>
								{year}
							</option>
						)}
					</select>
				</div>
				<div>
					<label htmlFor="taxYearStates">
						2. In what state(s) did you live in this tax year? <span style={{opacity: this.props.taxpayerReturn.residenceHistory.length === 0 ? 0 : 1}} className="reset-link" onClick={this.props.stepActions.resetResidenceHistory}>reset</span>
					</label>
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
