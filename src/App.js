import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import {
  Home,
  Rsp,
  FiveStone,
  HomeBestOfBestList,
  HomeBestOfBestList2,
  Calendar,
  ThreeD,
  PlayBoard,
} from "./pages";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1" element={<Rsp />} />
        <Route path="/2" element={<FiveStone />} />
        <Route path="/3" element={<HomeBestOfBestList />} />
        <Route path="/4" element={<ThreeD />} />
        {/* <Route path="/5" element={<Calendar />} /> */}
        <Route path="/6" element={<PlayBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
