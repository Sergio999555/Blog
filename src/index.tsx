import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import { CookiesProvider } from "react-cookie";

import { App } from "./components/App/App";

import store from "./store/store";

import "../src/index.scss";

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
