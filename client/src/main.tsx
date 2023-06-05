import React from "react";
import ReactDOM from "react-dom/client";
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
      <MainRouter />
    </Provider>
  </React.StrictMode>
);
