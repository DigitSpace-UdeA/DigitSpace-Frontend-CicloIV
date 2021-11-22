import React from "react";
import "./App.css";
import Index from "./pages/Index";
import Main from "./pages/Main";
// import Prueba from "./pages/Prueba";
import Layout from "./layouts/Layout";
import Proyectos from "./pages/Proyectos";
// import {outlet} from react-router-dom;

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/main" element={<Layout />}>
          <Route path="" element={<Main />} />
          <Route path="proyectos" element={<Proyectos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
