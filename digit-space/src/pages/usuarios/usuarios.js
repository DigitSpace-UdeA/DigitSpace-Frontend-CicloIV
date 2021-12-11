import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {GET_AVANCE, GET_USUARIOS } from "../../graphql/proyectos/queries";

const ListarUsuarios = () => {

    const { data, error, loading } = useQuery(GET_USUARIOS);

    useEffect(() => {
        console.log("datos del servidor, users", data);
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.error("error consultando users ");
        }
    }, [error]);

    if (loading) return <div>cargando...</div>;

    return <div >
        PAGINA DE USUARIOS
    </div>;
};

export default ListarUsuarios;