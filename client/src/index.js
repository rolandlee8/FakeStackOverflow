import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FakeStackOverflow from "./components/fakestackoverflow.js";

ReactDOM.render(
  <FakeStackOverflow page="questionPage" />,
  document.getElementById("root")
);
