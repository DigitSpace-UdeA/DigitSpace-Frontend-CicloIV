import React from "react";
import "./App.css";
import Index from "./pages/Index";
import Main from "./pages/Main";
// import Prueba from "./pages/Prueba";
import Layout from "./layouts/Layout";
import Proyectos from "./pages/proyectos/Proyectos";
import "./styles/tabla.css";
// import {outlet} from react-router-dom;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import EditarProyecto from "./pages/proyectos/EditarProyecto";
import Usuarios from "./pages/usuarios/usuarios";
import EditarUsuario from "./pages/usuarios/EditarUsuario";
import { setContext } from "@apollo/client/link/context";
import jwt_decode from "jwt-decode";
import { UserContext } from "./context/UserContext";
import { AuthContext } from "./context/authContext";
import Login from "./pages/Ingreso/login";
import Register from "./pages/Ingreso/register";

const client = new ApolloClient({
  uri: "https://servidor-graphql-digitspace.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem("token"));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");

  const setToken = (token) => {
    console.log("set token", token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/main" element={<Layout />}>
                <Route path="" element={<Main />} />
                <Route path="proyectos" element={<Proyectos />} />
                <Route
                  path="proyectos/editar/:_id"
                  element={<EditarProyecto />}
                />
                <Route path="usuarios" element={<Usuarios />} />
                <Route
                  path="usuarios/editar/:_id"
                  element={<EditarUsuario />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
