import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const root = window.__NEXT_NOTE_APP_ROOT__ || ReactDOM.createRoot(document.getElementById('root'))

window.__NEXT_NOTE_APP_ROOT__ = root


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
