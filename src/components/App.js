import React from "react";
import Authentication from "./Authentication";

import Posts from "./Posts";

const App = () => {
  return (
    <main className="Application">
      <h1>Blog</h1>
      <Authentication />
      <Posts />
    </main>
  );
};

export default App;
