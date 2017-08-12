import React, { Component } from "react";

export default class Step extends Component {
  render() {
    return (
			<div className="step">
				{this.props.children}
			</div>
    );
  }
}
