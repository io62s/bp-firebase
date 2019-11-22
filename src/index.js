import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import PostsProvider from "./providers/PostsProvider";
import UserProvider from "./providers/UserProvider";

ReactDOM.render(
  <UserProvider>
    <PostsProvider>
      <App />
    </PostsProvider>
  </UserProvider>,
  document.getElementById("root")
);
