import React from "react";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./reusable/ErrorBoundary";
import ErrorMessage from "./reusable/ErrorMessage";
import MainRouter from "./MainRouter";
import "./styles/reusable.css";
import "./styles/index.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/order.css";
import "./styles/order-history.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        fallback={
          <ErrorMessage
            className="not-found error-boundary"
            text={
              "Something went wrong. \n Please refresh the page and try again."
            }
          />
        }
      >
        <MainRouter />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
