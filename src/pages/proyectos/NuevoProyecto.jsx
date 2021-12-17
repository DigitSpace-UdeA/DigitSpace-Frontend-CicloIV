import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Input from "components/Input";
import { GET_USUARIOS } from "graphql/usuarios/queries";
import { Link } from "react-router-dom";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { Enum_TipoObjetivo, Enum_EstadoProyecto } from "utils/enums";
import { nanoid } from "nanoid";
import { ObjContext } from "context/objContext";
import { useObj } from "context/objContext";
import { CREAR_PROYECTO } from "graphql/proyectos/mutations";
import { toast } from "react-toastify";

const NuevoProyecto = () => {
  const { form, formData, updateFormData } = useFormData();
  const [listaUsuarios, setListaUsuarios] = useState({});
  const { data, loading, error } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: "LIDER", estado: "AUTORIZADO" },
    },
  });

  const [
    crearProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_PROYECTO);

  useEffect(() => {
    console.log(data);
    if (data) {
      const lu = {};
      data.Usuarios.forEach((elemento) => {
        lu[elemento._id] = elemento.correo;
      });

      setListaUsuarios(lu);
    }
  }, [data]);

  ///
  useEffect(() => {
    if (mutationData) {
      toast.success("Proyecto creado con éxito");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error al intentar crear el proyecto");
    }
  }, [mutationError]);
  ///

  // useEffect(() => {
  //   console.log('data mutation', mutationData);
  // });

  const submitForm = (e) => {
    e.preventDefault();

    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);

    crearProyecto({
      variables: formData,
    });
  };

  if (loading) return <div>...Loading</div>;

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="self-start">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Proyecto</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input name="nombre" label="Nombre" required={true} type="text" />
        <Input
          name="presupuesto"
          label="Presupuesto"
          required={true}
          type="number"
        />
        {/* <Input
          name="fechaInicial"
          label="Fecha de Inicio"
          required={true}
          type="date"
        />
        <Input
          name="fechaFinal"
          label="Fecha de Fin"
          required={true}
          type="date"
        /> */}
        {/* <DropDown
          name="estadoProyecto"
          label="Estado de proyecto"
          required={true}
          type="text"
          options={Enum_EstadoProyecto}
        /> */}

        <DropDown
          label="Líder"
          options={listaUsuarios}
          name="lider"
          required={true}
        />
        <Objetivos />
        <ButtonLoading text="Crear Proyecto" loading={false} disabled={false} />
      </form>
    </div>
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 4) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Insertar Objetivos </span>
        {!maxObjetivos && (
          <i
            onClick={() =>
              setListaObjetivos([
                ...listaObjetivos,
                componenteObjetivoAgregado(),
              ])
            }
            className="fas fa-list-ul rounded bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer"
          />
        )}
        {listaObjetivos.map((objetivo) => {
          return objetivo;
        })}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className="flex items-center">
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label="Descripción"
        type="text"
        required={true}
      />
      <DropDown
        name={`nested||objetivos||${id}||tipo`}
        options={Enum_TipoObjetivo}
        label="Tipo de Objetivo"
        required={true}
      />
      <i
        onClick={() => eliminarObjetivo(id)}
        className="fas fa-times rounded bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6"
      />
    </div>
  );
};

export default NuevoProyecto;
