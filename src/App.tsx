import React from "react";
import ReactDOM from "react-dom";

import TestComponent from "./components/infiniteScroll/tests/TestComponent";

import "./index.css";

const App = () => {
  return <TestComponent />;
};

ReactDOM.render(<App />, document.getElementById("app"));
