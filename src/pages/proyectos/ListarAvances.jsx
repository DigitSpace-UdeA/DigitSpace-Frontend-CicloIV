import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AVANCE } from "../../graphql/proyectos/queries";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import PrivateComponent from 'components/PrivateComponent';

const ListarAvance = () => {

    const { _id } = useParams();

    const { data: avanceData, error, loading } = useQuery(GET_AVANCE, {
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

    if (avanceData.filtrarAvance) {

        return <div >

            <h1 className="mx-6 my-10 font-bold text-4xl" >Lista de Avances</h1>

            <label className="m-5 flex font-bold text-xl rounded-lg text-gray-800">Proyecto:
                <input className="sinborde border-red-900 border-0 mx-5 text-xl text-gray-600" value={avanceData.filtrarAvance[0].proyecto.nombre} readOnly></input>
            </label>
            <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
                <div className="flex flex-col p-2 mx-7 my-7 bg-gray-300 rounded-lg shadow-lg">
                    {avanceData.filtrarAvance.map((avance) => {
                        return <div>
                            <div className="my-2 flex flex-col bg-gray-100 rounded-lg border-2 border-red-800 shadow-lg text-gray-800 ">
                                <div className="py-1 px-2 flex justify-between border-2 border-red-800 bg-red-800 rounded-md text-gray-200 ">
                                    <label className="font-bold">Creado por:
                                        <input className="sinborde mx-1 p-1 bg-red-800 rounded-lg border-2 border-red-800" value={avance.creadoPor.nombre} onmousedown="return false;" readOnly></input>
                                    </label>
                                    <label className="font-bold">Fecha:
                                        <input className="sinborde mx-1 p-1 bg-red-800 rounded-lg border-2 border-red-800" value={avance.fechaAvance} readOnly></input>
                                    </label>
                                </div >
                                <div className="flex flex-col mx-5 my-1">
                                    <label className="font-bold">Descripción: </label>
                                    <input className="sinborde mx-1 p-1 bg-gray-100 rounded-lg border-2 border-red-800" value={avance.descripcion} readOnly></input>
                                    <label className="font-bold"> Observaciones: </label>
                                    {avance.observaciones.map((o) => {
                                        return <>
                                            <input className="sinborde mx-1 p-1 bg-gray-100 rounded-lg border-2 border-red-800" value={o} readOnly></input>
                                        </>
                                    })}
                                </div >
                            </div>
                        </div>
                    })}
                </div>
            </PrivateComponent>
        </div>;
    }
    return <></>;
};

export default ListarAvance;