import React from "react";
import ReactDOM from "react-dom";

import "babel-polyfill";
// import "./app";

import './scss/test.scss';

class HelloMessage extends React.Component {
  render() {
    return <p>Hello {this.props.name}</p>;
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<HelloMessage name="Jane" />, mountNode);
