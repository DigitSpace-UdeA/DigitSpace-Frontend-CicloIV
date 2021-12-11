import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTOS, GET_PROYECTO, GET_AVANCE, GET_NOMBREPROYECTO } from "../../graphql/proyectos/queries";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import useFormData from "../../hooks/useFormData";


const RegistrarAvance = () => {
    const {form, formData, updateFormData} = useFormData();

    const { _id } = useParams();

    const { data, error, loading } = useQuery(GET_PROYECTO, {
        variables: { _id }
    });

    if (loading) return <div>cargando...</div>;

    console.log("data proyecto", data);

    

    const submitAvance = (e) => {
        e.preventDefault();
        console.log("form data", formData);
    }

    return <div className="">
        <h1 className="m-5 font-bold text-4xl" >Registro de Avances</h1>
        <div className="p-1 m-20 bg-gray-200 rounded-lg shadow-lg">
            <label className=" m-5 flex font-bold rounded-lg">
                Proyecto: <input value={data.Proyecto.nombre} readOnly></input>
            </label>
            <form onSubmit={submitAvance}
                onchange={updateFormData}
                ref={form}>
                <label className="m-5 flex font-bold  flex rounded-lg">
                    Fecha</label>
                <label className="m-5 flex font-bold hover:shadow-lg flex rounded-lg">
                    Descripción <br></br>
                    <textarea name="descripcion" className="m-3" rows="6" cols="50"></textarea>
                </label>
                <label className=" font-bold hover:shadow-lg flex rounded-lg">
                    Observaciones del lider
                    <textarea name="observaciones" className="" rows="3" cols="50"></textarea>
                </label>
            </form>
            <div className=" flex justify-center  mt-3">
                <button className="bg-gray-900  text-base rounded-b-lg p-3 text-white">
                    Guardar <i className="far fa-save text-green-400"></i>
                </button>
                <button
                    className="bg-gray-900  text-base rounded-b-lg p-3 ml-2 text-white "
                    onClick={() => {

                    }}
                >
                    Cancelar <i className="far fa-window-close text-red-400"></i>
                </button>
            </div>
        </div>
    </div>;
};

export default RegistrarAvance;