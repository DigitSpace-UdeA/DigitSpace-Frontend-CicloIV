import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {GET_AVANCE } from "../../graphql/proyectos/queries";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListarAvance = () => {

    const { _id } = useParams();

    const { data:avanceData, error, loading } = useQuery(GET_AVANCE, {
        variables: { _id }
    });

    useEffect(() => {
        console.log("datos del servidor, avances", avanceData);
        console.log(_id);
    }, [avanceData]);

    useEffect(() => {
        if (error) {
            toast.error("error consultando avances ");
            console.log("Error", error);
        }
    }, [error]);

    if (loading) return <div>cargando...</div>;

    return <div >

        <h1 className="m-5 font-bold text-4xl" >Lista de Avances</h1>
        <div className="flex flex-col p-1 m-20 bg-blue-900 rounded-lg shadow-lg">
            <label className=" m-5 flex font-bold rounded-lg text-gray-300">Proyecto</label>
            <div className=" mx-5 flex flex-col bg-gray-200 rounded-lg border-2 border-blue-800 border-opacity-25 ">
                <label>Creado por:</label>
                <label>Descripción:</label>
                <label>Fecha:</label>
            </div  >
        </div>
    </div>;
};

export default ListarAvance;