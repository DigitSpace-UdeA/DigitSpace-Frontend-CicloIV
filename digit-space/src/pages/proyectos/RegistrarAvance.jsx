import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTOS, GET_PROYECTO } from "../../graphql/proyectos/queries";
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



const RegistrarAvance = () => {

    const { data: queryData, error, loading } = useQuery(GET_PROYECTOS);

    const [estadoCambioRegistro, setEstadoCambioRegistro] = useState(false);

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        console.log("datos del servidor, prueba", queryData);
    }, [queryData]);

    useEffect(() => {
        if (error) {
            toast.error("error consultando proyectos");
        }
    }, [error]);

    if (loading) return <div>cargando...</div>;


    return <div className="">
        <h1 className="m-5 font-bold text-4xl" >Registro de Avances</h1>
        <div className="p-1 m-20 bg-gray-200 rounded-lg shadow-lg">
            <form>
                <label className=" m-5 flex font-bold rounded-lg">
                    Proyecto</label>
                <label className="m-5 flex font-bold  flex rounded-lg">
                    Fecha</label>
                <label className="m-5 flex font-bold hover:shadow-lg flex rounded-lg">
                    Descripción <br></br>
                    <textarea className="m-3" rows="6" cols="50"></textarea>
                </label>
                <label className=" font-bold hover:shadow-lg flex rounded-lg">
                    Observaciones del lider
                    <textarea className="" rows="3" cols="50"></textarea>
                </label>
            </form>
            <div className=" flex justify-center  mt-3">
                <button className="bg-gray-900  text-base rounded-b-lg p-3 text-white">
                    Guardar <i class="far fa-save text-green-400"></i>
                </button>
                <button
                    className="bg-gray-900  text-base rounded-b-lg p-3 ml-2 text-white "
                    onClick={() => {
                        setEstadoCambioRegistro(false);
                    }}
                >
                    Cancelar <i class="far fa-window-close text-red-400"></i>
                </button>
            </div>
        </div>
    </div>;
};

export default RegistrarAvance;