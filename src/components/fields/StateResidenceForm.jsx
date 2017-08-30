import React, { Component } from "react";
import StateSelect from "./StateSelect.jsx";
import MonthSelectionForm from "./MonthSelectionForm.jsx";
import states from "../../constants/states";
import '../../styles/StateResidenceForm.css'

export default class StateResidenceForm extends Component {
  handleConfirmationClick = isConfirmed => e => {
    e.preventDefault();
    this.props.onConfirmAdditionalStates(isConfirmed)
  }
  render() {
    const shouldShowConfirmation = this.props.shouldPromptConfirmation;
    return (
      <div className="row">
        <div className="three columns">
          <StateSelect
            selectedStateAbbreviation={this.props.selectedStateAbbreviation}
            statesToExclude={this.props.statesToExclude}
            selectText={this.props.selectStateText}
            onChange={this.props.onStateSelect} />
        </div>
        <div
          className="nine columns"
          style={{ height: "100%", position: "relative" }}
        >
          <div
            className="month-selection animate-opacity"
            style={{ opacity: this.props.shouldShowMonthSelection ? 1 : 0, pointerEvents: this.props.shouldShowMonthSelection ? 'auto' : 'none' }}
          >
            <MonthSelectionForm
              months={this.props.months}
              onMonthClick={this.props.onMonthSelect}
              id={this.props.id}
            />
          </div>
          <div
            className="residence-confirmation animate-opacity"
            style={{
              opacity: shouldShowConfirmation ? 1 : 0,
              zIndex: shouldShowConfirmation ? 1 : -1
            }}
          >
            <p>
              Did you live in {states[this.props.selectedStateAbbreviation]} all year?
              <a
                onClick={this.handleConfirmationClick(true)}
                className="button confirmation-option"
                style={{marginLeft: 16}}
                href="#yes"
              >
                Yes
              </a>
              <a
                onClick={this.handleConfirmationClick(false)}
                className="button confirmation-option"
                href="#no"
              >
                No
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
