import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taxpayerReturnActions from "./actions/actions";
import { times, difference } from "lodash";
import { getTaxpayerReturn, getUI } from "./reducers";
import taxpayerReturnFields from "./constants/taxpayerReturnFields";

import StateResidenceForm from "./components/StateResidenceForm.jsx";

import "./styles/normalize.css";
import "./styles/skeleton.css";
import "./App.css";

function getTaxYears() {
  const startYear = 2014;
  return times(
    new Date().getFullYear() - startYear + 1,
    i => i + startYear
  ).reverse();
}

class App extends Component {
  handleReturnFieldUpdate = fieldName => e => {
    this.props.actions.updateTaxpayerReturnField(fieldName, e.target.value)
  }
  handleMonthSelect = stateIndex => monthId => this.props.actions.selectStateMonth(stateIndex, monthId)
  handleStateSelect = stateIndex => stateAbbreviation => {
    !!stateAbbreviation ?
          this.props.actions.selectState(stateAbbreviation, stateIndex) :
          this.props.actions.removeState(stateIndex)
  }
  render() {
    console.log(this.props.taxpayerReturn)
    const numberOfStatesToShow = typeof this.props.ui.isConfirmedSingleState === "undefined" ? 1 : this.props.taxpayerReturn.residenceHistory.length + 1
    return (
      <div className="container">
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
              2. In what state(s) did you live in this tax year? <span style={{opacity: this.props.taxpayerReturn.residenceHistory.length === 0 ? 0 : 1}} className="reset-link" onClick={this.props.actions.resetResidenceHistory}>reset</span>
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
                    onConfirmAdditionalStates={this.props.actions.confirmSingleState}
                    selectedStateAbbreviation={state ? state.stateAbbreviation : "" }
                    shouldShowMonthSelection={shouldShowMonthSelection}
                    shouldPromptConfirmation={shouldPromptConfirmation}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    taxpayerReturn: getTaxpayerReturn(state),
    ui: getUI(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taxpayerReturnActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
