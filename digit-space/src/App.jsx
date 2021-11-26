import React from "react";
import "./App.css";
import Index from "./pages/Index";
import Main from "./pages/Main";
import Prueba from "./pages/Prueba";
import Layout from "./layouts/Layout";
// import {outlet} from react-router-dom;
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexUsuarios from "./pages/usuarios/Index";
import EditarUsuario from "./pages/usuarios/Editar";
import 'styles/tabla.css';
import 'styles/App.css';

// const httplink = createHttpLink({
//   uri: "https://servidor-graphql-digitspace.herokuapp.com/graphql",
// })

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
          <Route path="/usuarios" element={<IndexUsuarios />}>
          <Route path="/usuarios/editar/:_id" element={<EditarUsuario />}></Route>
          <Route path="" element={<Main />} />
          <Route path="prueba" element={<Prueba />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
