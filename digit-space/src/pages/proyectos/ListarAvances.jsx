import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTOS, GET_PROYECTO, GET_AVANCE } from "../../graphql/proyectos/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Input, Textarea } from "../../components/input";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ButtonLoading from "../../components/ButtonLoanding";

import {
    Enum_EstadoProyecto,
    Enum_FaseProyecto,
} from "../../utils/EnumProyectos";
import { Dialog } from "@mui/material";
import Dropdown from "../../components/Dropdown";
import {
    EDITAR_PROYECTOADMINISTRADOR,
    EDITAR_PROYECTOLIDER,
} from "../../graphql/proyectos/mutations";
import useFormData from "../../hooks/useFormData";



const ListarAvance = () => {

    const { data: queryData, error, loading } = useQuery(GET_AVANCE);

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        console.log("datos del servidor, prueba", queryData);
    }, [queryData]);

    useEffect(() => {
        if (error) {
            toast.error("error consultando ");
        }
    }, [error]);

    if (loading) return <div>cargando...</div>;

    const ListadoAvances = () => {
        if (queryData.Avances) {
            return (
                <div>
                    {queryData.Avances.map((avance) => {
                        return <div>{avance.descripcion}</div>;
                    })}
                </div>
            );
        }
    }

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