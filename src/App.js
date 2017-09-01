import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taxpayerReturnActions from "./actions/actions";
import * as navActions from "./actions/navActions";
import { getTaxpayerReturn, getUI } from "./reducers";
import { individualDataFields, householdSizeFields } from "./constants/steps";

import "./styles/normalize.css";
import "./styles/skeleton.css";
import "./styles/skeletonOverrides.css";
import "./App.css";

import AppHeader from "./components/AppHeader.jsx";
import AppFooter from "./components/AppFooter.jsx";

import VITAConfirmation from "./components/nav/VITAConfirmation.jsx";
import NavStatus from "./components/nav/NavStatus.jsx";

import StepYearAndState from "./components/step/steps/StepYearAndState.jsx";
import StepDependentData from "./components/step/steps/StepDependentData.jsx";
import FieldsStep from "./components/step/steps/FieldsStep.jsx";

import NextStepButton from "./components/nav/NextStepButton.jsx";
import PrevStepButton from "./components/nav/PrevStepButton.jsx";

import ResultOutOfVITAScopeDisqualification from "./components/results/ResultOutOfVITAScopeDisqualification.jsx";
import ResultQualification from "./components/results/ResultQualification.jsx";

const steps = [
  StepYearAndState,
  FieldsStep(individualDataFields),
  StepDependentData,
  FieldsStep(householdSizeFields)
];

const results = {
  stateDisqualification: {
    ResultComponent: ResultQualification,
    resultActions: {
      onBack: taxpayerReturnActions.clearResult,
      onToggleCalculations: taxpayerReturnActions.toggleCalculations
    }
  },
  modifiedAGIDisqualification: {
    ResultComponent: ResultQualification,
    resultActions: {
      onBack: taxpayerReturnActions.clearResult,
      onToggleCalculations: taxpayerReturnActions.toggleCalculations
    }
  },
  outOfVITAScopeDisqualification: {
    ResultComponent: ResultOutOfVITAScopeDisqualification,
    resultActions: {
      onBack: taxpayerReturnActions.clearResult,
      onOverrideOutOfScope: taxpayerReturnActions.overrideOutOfScope
    }
  },
  qualified: {
    ResultComponent: ResultQualification,
    resultActions: {
      onBack: taxpayerReturnActions.clearResult,
      onToggleCalculations: taxpayerReturnActions.toggleCalculations
    }
  }
};

class App extends Component {
  renderStep = () => {
    const StepComponent = steps[this.props.ui.step - 1];
    return (
      <div className="container">
        <AppHeader onResetTool={this.props.stepActions.resetTool} />
        <StepComponent
          ui={this.props.ui}
          taxpayerReturn={this.props.taxpayerReturn}
          stepActions={this.props.stepActions}
          navActions={this.props.navActions}
        />
        <nav>
          <VITAConfirmation
            isVITAUser={this.props.ui.isVITAUser}
            onVitaConfirmation={this.props.stepActions.toggleVITAUser}
            isHidden={this.props.ui.step !== 1}
          />
          <PrevStepButton
            onClick={this.props.navActions.previousStep}
            isHidden={this.props.ui.step === 1}
          />
          <NavStatus
            numberOfSteps={steps.length - 1}
            activeStep={this.props.ui.step}
            onClick={this.props.navActions.updateStep}
          />
          <NextStepButton
            onClick={this.props.navActions.nextStep}
            isDisabled={false}
          />
        </nav>
        <AppFooter />
      </div>
    );
  };
  renderResult = () => {
    const { type, ...rest } = this.props.ui.result;
    const { ResultComponent, resultActions } = results[type];
    const boundResultActions = bindActionCreators(resultActions, this.props.dispatch);
    return (
      <div className="container">
        <AppHeader onResetTool={this.props.stepActions.resetTool} />
        <div className="result-container">
          <ResultComponent
            taxpayerReturn={this.props.taxpayerReturn}
            ui={this.props.ui}
            {...boundResultActions}
            {...rest}
          />
          <AppFooter />
        </div>
      </div>
    );
  };
  render() {
    return this.props.ui.result ? this.renderResult() : this.renderStep();
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
    navActions: bindActionCreators(navActions, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
