import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./store";
import Users from "./Users";

const Root = () => {
  return (
    <div>
      <Users />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
