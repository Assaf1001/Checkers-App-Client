import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./routers/AppRouter";
import "normalize.css";
import "./styles/styles.scss";

ReactDOM.render(<AppRouter />, document.getElementById("root"));

reportWebVitals();
