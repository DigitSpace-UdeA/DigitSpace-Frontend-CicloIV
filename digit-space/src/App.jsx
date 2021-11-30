import React, { useState } from "react";
import "./App.css";
import Index from "./pages/Index";
import Main from "./pages/Main";
import Prueba from "./pages/Prueba";
import Layout from "./layouts/Layout";
// import {outlet} from react-router-dom;
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexUsuarios from "./pages/usuarios/Index";
import EditarUsuario from "./pages/usuarios/Editar";
import "styles/tabla.css";
import "styles/App.css";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { UserContext } from "./context/userContext";
import { AuthContext } from "./context/authContext";

// const httplink = createHttpLink({
//   uri: "https://servidor-graphql-digitspace.herokuapp.com/graphql",
// })

const client = new ApolloClient({
  uri: "https://servidor-graphql-digitspace.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {

  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState({});

  const setToken = (token) => {
    setAuthToken(token)
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  };

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{setToken}}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/main" element={<Layout />}>
                <Route path="/usuarios" element={<IndexUsuarios />}>
                  <Route
                    path="/usuarios/editar/:_id"
                    element={<EditarUsuario />}
                  ></Route>
                  <Route path="" element={<Main />} />
                  <Route path="prueba" element={<Prueba />} />
                </Route>
                <Route path="/auth" element={<AuthLayout />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
