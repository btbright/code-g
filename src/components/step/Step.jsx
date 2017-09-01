import React, { Component } from "react";

const stepIntroText = {
  2: {
    text: "Use Summary/Print page in TaxSlayer",
    isVITAOnly: true
  }
};

export default class Step extends Component {
  render() {
    let introText;
    const introTextInfo = stepIntroText[this.props.ui && this.props.ui.step];
    if (introTextInfo) {
      if (
        !introTextInfo.isVITAOnly ||
        (this.props.ui.isVITAUser && introTextInfo.isVITAOnly)
      ) {
        introText = introTextInfo.text;
      }
    }
    return (
      <div className="step">
        {introText &&
          <h1 className="introText">
            {introText}
          </h1>}
        {this.props.children}
      </div>
    );
  }
}
