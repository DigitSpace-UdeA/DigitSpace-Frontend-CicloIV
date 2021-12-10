import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USUARIOS } from "../../graphql/usuarios/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Enum_Rol, Enum_Estado_Usuarios } from "../../utils/EnumProyectos";
import PrivateRoute from "../../components/PrivateRoute";

const Usuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los usuarios");
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    // <PrivateRoute roleList={[""]}>
    <div>
      Datos Usuarios:
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
                      <Link to={`editar/${u._id}`}>
                        <i className="fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer" />
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
    // </PrivateRoute>
  );
};

export default Usuarios;
