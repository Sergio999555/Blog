import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import "../src/index.scss";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
