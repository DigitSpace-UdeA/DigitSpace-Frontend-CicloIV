import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USUARIOS } from "graphql/usuarios/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Enum_Rol, Enum_Estado_Usuarios } from "utils/enums";
import PrivateRoute from "components/PrivateRoute";

const IndexUsuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los usuarios");
    }
  }, [error]);

  if (loading) return <div>Cargando...</div>;

  return (
    <PrivateRoute roleList={["ADMINISTRADOR"]}>
      <div className="p-10 w-full flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900 flex w-full items-center justify-center">
          Listado de Usuarios
        </span>
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Usuarios ? (
              <>
                {data.Usuarios.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.apellido}</td>
                      <td>{u.correo}</td>
                      <td>{u.identificacion}</td>
                      <td>{Enum_Rol[u.rol]}</td>
                      <td>{Enum_Estado_Usuarios[u.estado]}</td>
                      <td>
                        <Link to={`/usuarios/editar/${u._id}`}>
                          <i className="fas fa-user-edit text-red-500 hover:text-yellow-400 cursor-pointer" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios;
