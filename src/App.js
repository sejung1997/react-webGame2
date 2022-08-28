import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home, Rsp, FiveStone } from "./pages";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1" element={<Rsp />} />
        <Route path="/2" element={<FiveStone />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
