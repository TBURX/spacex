import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import App from "./app/App";
import "antd/dist/antd.css";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
