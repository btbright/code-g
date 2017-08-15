import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taxpayerReturnActions from "./actions/actions";
import * as navActions from "./actions/navActions";
import { getTaxpayerReturn, getUI } from "./reducers";

import "./styles/normalize.css";
import "./styles/skeleton.css";
import "./styles/skeletonOverrides.css";
import "./App.css";

import NavStatus from "./components/NavStatus.jsx";

import StepYearAndState from "./components/StepYearAndState.jsx";
import StepIndividualData from "./components/StepIndividualData.jsx";
import StepDependentData from "./components/StepDependentData.jsx";
import StepHousehold from "./components/StepHousehold.jsx";

import NextStepButton from "./components/NextStepButton.jsx";
import PrevStepButton from "./components/PrevStepButton.jsx";

import ResultStateDisqualification from "./components/ResultStateDisqualification.jsx";
import ResultModifiedAGIDisqualification from "./components/ResultModifiedAGIDisqualification.jsx";
import ResultOutOfVITAScopeDisqualification from "./components/ResultOutOfVITAScopeDisqualification.jsx";
import ResultQualification from "./components/ResultQualification.jsx";

const steps = [
  StepYearAndState,
  StepIndividualData,
  StepDependentData,
  StepHousehold
];

const results = {
  stateDisqualification: ResultStateDisqualification,
  modifiedAGIDisqualification: ResultModifiedAGIDisqualification,
  outOfVITAScopeDisqualification: ResultOutOfVITAScopeDisqualification,
  qualified: ResultQualification
};

class App extends Component {
  renderStep = () => {
    const StepComponent = steps[this.props.ui.step - 1];
    return (
      <div className="container">
        <StepComponent
          ui={this.props.ui}
          taxpayerReturn={this.props.taxpayerReturn}
          stepActions={this.props.stepActions}
          navActions={this.props.navActions}
        />
        <nav>
          <PrevStepButton
            onClick={this.props.navActions.previousStep}
            isHidden={this.props.ui.step === 1}
          />
          <NavStatus
            numberOfSteps={steps.length-1}
            activeStep={this.props.ui.step}
            onClick={this.props.navActions.updateStep}
          />
          <NextStepButton
            onClick={this.props.navActions.nextStep}
            isDisabled={false}
          />
        </nav>
      </div>
    );
  };
  renderResult = () => {
    const { type, ...rest } = this.props.ui.result
    const ResultComponent = results[type];
    return (
      <div className="container result-container">
        <ResultComponent taxpayerReturn={this.props.taxpayerReturn} {...rest} />
      </div>
    );
  };
  render() {
    console.log("this.props.taxpayerReturn", this.props.taxpayerReturn);
    console.log("this.props.ui", this.props.ui);

    let componentToRender = this.props.ui.result
      ? this.renderResult()
      : this.renderStep();
    return componentToRender;
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
    stepActions: bindActionCreators(taxpayerReturnActions, dispatch),
    navActions: bindActionCreators(navActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
