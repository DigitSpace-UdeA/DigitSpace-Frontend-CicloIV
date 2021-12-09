import React from "react";
import "./App.css";
import Index from "./pages/Index";
import Main from "./pages/Main";
// import Prueba from "./pages/Prueba";
import Layout from "./layouts/Layout";
import Proyectos from "./pages/proyectos/Proyectos";
import RegistrarAvance from "./pages/proyectos/RegistrarAvance";
import ListarAvance from "./pages/proyectos/ListarAvances";
import "./styles/tabla.css";
// import {outlet} from react-router-dom;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import EditarProyecto from "./pages/proyectos/EditarProyecto";

const client = new ApolloClient({
  uri: "https://servidor-graphql-digitspace.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/main" element={<Layout />}>
            <Route path="" element={<Main />} />
            <Route path="proyectos" element={<Proyectos />} />
            <Route path="proyectos/avances/:_id" element={<RegistrarAvance />} />
            <Route path="listarAvances" element={<ListarAvance />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
