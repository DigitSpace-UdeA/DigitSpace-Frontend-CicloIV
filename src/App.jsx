import React, { useState, useEffect } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { UserContext } from 'context/userContext';
import { UserContext } from "./context/userContext";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import IndexUsuarios from "pages/usuarios";
import Index from "pages/index";
import EditarUsuario from "pages/usuarios/editar";
import AuthLayout from "layouts/AuthLayout";
import Register from "pages/auth/register";
import Login from "pages/auth/login";
import { AuthContext } from "context/authContext";
import IndexProyectos from "pages/proyectos/Index";
import jwt_decode from "jwt-decode";
import "styles/globals.css";
import "styles/tabla.css";
import NuevoProyecto from "pages/proyectos/NuevoProyecto";
import IndexInscripciones from "./pages/inscripciones";
import ListarAvance from "pages/proyectos/ListarAvances";
import RegistrarAvance from "pages/proyectos/RegistrarAvance";

// import PrivateRoute from 'components/PrivateRoute';

const httpLink = createHttpLink({
  uri: "https://servidor-graphql-digitspace.herokuapp.com/graphql",
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
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
              <Route path="/" element={<PrivateLayout />}>
                <Route path="inicio" element={<Index />} />
                <Route path="usuarios" element={<IndexUsuarios />} />
                <Route
                  path="usuarios/editar/:_id"
                  element={<EditarUsuario />}/>
                <Route path="proyectos" element={<IndexProyectos />} />
                <Route path="proyectos/nuevo" element={<NuevoProyecto />} />
                <Route
                  path="proyectos/listarAvances/:_id"
                  element={<ListarAvance />}/>
                <Route
                  path="proyectos/registrarAvances/:_id"
                  element={<RegistrarAvance />}/>
                <Route path="inscripciones" element={<IndexInscripciones />} />
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
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
