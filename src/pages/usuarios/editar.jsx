import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USUARIO } from "graphql/usuarios/queries";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { EDITAR_USUARIO } from "graphql/usuarios/mutations";
import DropDown from "components/Dropdown";
import { Enum_Estado_Usuarios } from "utils/enums";

const EditarUsuario = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario modificado correctamente");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el usuario");
    }

    if (queryError) {
      toast.error("Error consultando el usuario");
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className="flew flex-col w-full h-full items-center justify-center p-10">
      <Link to="/usuarios">
        <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
        Editar el Usuario
      </h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-center justify-center"
      >
        <Input
          label="Nombre:"
          type="text"
          name="nombre"
          defaultValue={queryData.Usuario.nombre}
          required={true}
        />
        <Input
          label="Apellido:"
          type="text"
          name="apellido"
          defaultValue={queryData.Usuario.apellido}
          required={true}
        />
        <Input
          label="Correo:"
          type="email"
          name="correo"
          defaultValue={queryData.Usuario.correo}
          required={true}
        />
        <Input
          label="Identificaci??n:"
          type="text"
          name="identificacion"
          defaultValue={queryData.Usuario.identificacion}
          required={true}
        />
        <DropDown
          label="Estado:"
          name="estado"
          defaultValue={queryData.Usuario.estado}
          required={true}
          options={Enum_Estado_Usuarios}
        />
        <span>Rol del usuario: {queryData.Usuario.rol}</span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Aceptar"
        />
      </form>
    </div>
  );
};

export default EditarUsuario;
