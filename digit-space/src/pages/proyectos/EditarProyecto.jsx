import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_PROYECTO } from "../../graphql/usuarios/queries";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Textarea } from "../../components/input";
import Dropdown from "../../components/Dropdown";
import ButtonLoading from "../../components/ButtonLoanding";
import useFormData from "../../hooks/useFormData";
import {
  Enum_EstadoProyecto,
  Enum_FaseProyecto,
} from "../../utils/EnumProyectos";

const EditarProyecto = () => {
  const { form, formData, updateFormData } = useFormData(null);

  const { _id } = useParams();
  const { data, error, loading } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });

  useEffect(() => {
    console.log("datos del proyecto, prueba", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("error consultando proyecto");
    }
  }, [error]);

  if (loading) return <div>cargando...</div>;

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className="mr-2 text-2xl text-center mb-5 p-3 rounded-lg">
        Editar Proyecto
      </h1>
      <form
        className="flex text-center justify-center"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <div>
          <Input
            label="Identificacion proyecto"
            type="text"
            name="_id"
            defaultValue={data.Proyecto._id}
            required={true}
            readonly="readonly"
          />
          <Input label="Documento lider" type="text" name="identificacion" />
          <Input
            label="Nombre del proyecto"
            type="text"
            name="documento"
            defaultValue={data.Proyecto.nombre}
            required={true}
          />
          <Input
            label="fecha de inicio"
            type="date"
            name="fechaInicial"
            defaultValue={data.Proyecto.fechaInicial}
            required={true}
            readonly="readonly"
          />

          <Dropdown
            label="Estado proyecto"
            name="estadoProyecto"
            defaultValue={data.Proyecto.estadoProyecto}
            required={true}
            options={Enum_EstadoProyecto}
          />
        </div>
        <div className=" pl-4">
          <Input label="Nombre lider" type="text" name="identificacion" />
          <Input
            label="Presupuesto"
            type="text"
            name="presupuesto"
            defaultValue={data.Proyecto.presupuesto}
            required={true}
          />
          <Input
            label="Fecha de terminación"
            type="date"
            name="fechaFinal"
            defaultValue={data.Proyecto.fechaFinal}
            required={true}
            readonly="readonly"
          />
          <Dropdown
            label="Fase proyecto"
            name="faseProyecto"
            defaultValue={data.Proyecto.faseProyecto}
            required={true}
            options={Enum_FaseProyecto}
          />{" "}
        </div>
        <div className=" pl-4">
          <Textarea
            label="Objetivo general"
            type="text"
            name="Objetivo General"
          />
          <Textarea
            label="Objetivo especifico"
            type="text"
            name="Objetivo especifico"
          />
          <Textarea
            label="Objetivo especifico"
            type="text"
            name="Objetivo especifico"
          />
        </div>
      </form>
      <div className=" flex justify-center  mt-3">
        <ButtonLoading
          disabled={Object.keys(false).length === 0}
          loading={false}
          text=" Confirmar "
        />
        {/* <button className="bg-gray-900  text-base rounded-b-lg p-3 text-white">
          Guardar <i class="far fa-save text-green-400"></i>
        </button> */}
        <Link to={`/main/proyectos/`}>
          <button className="bg-gray-900  text-base rounded-b-lg p-3 ml-2 text-white ">
            Cancelar <i class="far fa-window-close text-red-400"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditarProyecto;
