import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form"
import Home from "./components/Home"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  );
}
export default App;