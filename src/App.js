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

import StepOne from "./components/StepOne.jsx";
import StepTwo from "./components/StepTwo.jsx";
import StepThree from "./components/StepThree.jsx";
import StepFour from "./components/StepFour.jsx";
import StepFive from "./components/StepFive.jsx";

import NextStepButton from "./components/NextStepButton.jsx";
import PrevStepButton from "./components/PrevStepButton.jsx";

import StateDisqualificationResult from "./components/StateDisqualificationResult.jsx";


const steps = [StepOne, StepTwo, StepThree, StepFour, StepFive]

const results = {
  'stateDisqualification': StateDisqualificationResult
}

class App extends Component {
  renderStep = () => {
    const StepComponent = steps[this.props.ui.step-1]
    return (
      <div className="container">
        <StepComponent
          ui={this.props.ui}
          taxpayerReturn={this.props.taxpayerReturn}
          stepActions={this.props.stepActions} />
        <nav>
          <NextStepButton
            onClick={this.props.navActions.nextStep}
            isDisabled={false} />
          <PrevStepButton
            onClick={this.props.navActions.previousStep}
            isHidden={this.props.ui.step === 1} />
        </nav>
      </div>
    )
  }
  renderResult = () => {
    const ResultComponent = results[this.props.ui.result]
    return (
      <div className="container result-container">
        <ResultComponent taxpayerReturn={this.props.taxpayerReturn} />
      </div>
    )
  }
  render() {

    console.log('this.props.taxpayerReturn', this.props.taxpayerReturn)
    console.log('this.props.ui', this.props.ui)

    let componentToRender = this.props.ui.result ? this.renderResult() : this.renderStep()
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
