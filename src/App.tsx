import React from "react";
import { Layout } from "layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div data-theme="dracula" className="h-full">
      <Layout />
      <Toaster />
    </div>
  );
}

export default App;
