import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTOS, GET_PROYECTO, GET_AVANCE, GET_NOMBREPROYECTO } from "../../graphql/proyectos/queries";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import useFormData from "../../hooks/useFormData";
import Input from 'components/Input';
import DropDown from 'components/Dropdown';
import { PROYECTOS } from 'graphql/proyectos/queries';
import ButtonLoading from 'components/ButtonLoading';


const RegistrarAvance = () => {
    const { form, formData, updateFormData } = useFormData();

    const { _id } = useParams();

    const { data: avanceData, error, loading } = useQuery(PROYECTOS, {
        variables: { _id }
    });

    if (loading) return <div>cargando...</div>;

    console.log("data proyecto", avanceData);

    const submitForm = (e) => {
        e.preventDefault();
        console.log("form data", formData);
    }

    //if (avanceData.filtrarAvance) {

        return <div className="">
            <h1 className="m-5 font-bold text-4xl" >Registro de Avances</h1>
            <div className="p-5 m-20 flex flex-col  bg-gray-200 rounded-lg shadow-lg">
                <label className="m-5 flex font-bold text-xl rounded-lg text-gray-800">Proyecto:
                    <input className="sinborde border-red-900 border-0 mx-5 text-xl text-gray-600  bg-gray-200" value="" readOnly></input>
                </label>
                <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
                    <Input name='fechaInicio' label='Fecha del Avance' required={true} type='date' />
                    <label >Descripcion</label><br></br>
                    <textarea cols="60" name='nombre' label='Descripcion' required={true} type='text' ></textarea><br></br>
                    <ButtonLoading text='Guardar' loading={false} disabled={false} />
                    <button className="sinborde bg-gray-900  text-base rounded-b-lg p-3 ml-2 text-white ">Cancelar <i className="far fa-window-close text-red-400"></i></button>
                </form>
            </div>
        </div>;
   // };
    //return <></>;
};

export default RegistrarAvance;