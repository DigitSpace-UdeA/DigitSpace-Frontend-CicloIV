import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS } from "../../graphql/usuarios/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Input, Textarea } from "../../components/input";

import {
  Enum_EstadoProyecto,
  Enum_FaseProyecto,
} from "../../utils/EnumProyectos";

const Proyectos = () => {
  const [estadoCambioRegistro, setEstadoCambioRegistro] = useState(false);
  const [estadoCambioVerProyectos, setEstadoCambioVerProyectos] =
    useState(false);
  const [estadoCambioInscribirProyecto, setEstadoCambioInscribirProyecto] =
    useState(false);
  const { data, error, loading } = useQuery(GET_PROYECTOS);

  useEffect(() => {
    console.log("datos del servidor, prueba", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("error consultando proyectos");
    }
  }, [error]);

  if (loading) return <div>cargando...</div>;

  const Inicio = () => {
    return (
      <div>
        <h1 className="">Hola soy el index</h1>
      </div>
    );
  };

  const VerProyectos = () => {
    return (
      <div className="flex">
        <button
          className="bg-gray-900  text-base rounded-b-lg p-2 ml-1 text-white "
          onClick={() => {
            setEstadoCambioVerProyectos(false);
          }}
        >
          <i class="fas fa-arrow-circle-left"></i>
        </button>

        <div className=" pl-3">
          lista de proyectos:
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Presupuesto</th>
                <th>Fecha inicial</th>
                <th>Fecha final</th>
                <th>Estado proyecto</th>
                <th>Fase proyecto</th>
                <th>Lider</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.Proyectos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.presupuesto}</td>
                      <td>{u.fechaInicial}</td>
                      <td>{u.fechaFinal}</td>
                      <td>{Enum_EstadoProyecto[u.estadoProyecto]}</td>
                      <td>{Enum_FaseProyecto[u.faseProyecto]}</td>
                      <td>{u.lider}</td>
                      <td>
                        <i class="fas fa-plus-circle"></i>
                        <Link to={`/main/proyectos/editar/${u._id}`}>
                          <i className="far fa-edit text-gray-600 hover:text-gray-400 cursor-pointer" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  const Registro = () => {
    return (
      <div>
        <h1 className="mr-2 text-2xl text-center mb-5 p-3 rounded-lg">
          Registrar Proyecto
        </h1>
        <form className="flex">
          <div>
            <Input label="Documento" type="text" name="identificacion" />
            <Input
              label="Nombre del proyecto"
              type="text"
              name="identificacion"
            />
            <Input label="fecha de inicio" type="date" name="identificacion" />
            <Input
              label="Estado del proyecto"
              type="text"
              name="identificacion"
            />
          </div>
          <div className=" pl-4">
            <Input label="Nombre completo" type="text" name="identificacion" />
            <Input label="Presupuesto" type="text" name="identificacion" />
            <Input
              label="Fecha de terminación"
              type="date"
              name="identificacion"
            />
            <Input
              label="Fase del proyecto"
              type="text"
              name="identificacion"
            />
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
    );
  };

  const InscribirProyecto = () => {
    return <div>Hola soy form de inscribir proyecto</div>;
  };

  return (
    <div className="flex justify-between">
      {/*--------------------------------- REGISTRO / LISTADO DE PROYECTOS ------------------------------------*/}
      <div>
        <div className="mx-8 justify-center">
          {/* <div>{estadoCambioRegistro ? <Registro /> : <Inicio />}</div>
          <div>{estadoCambioVerProyectos ? <VerProyectos /> : <Inicio />}</div> */}
          <div>
            {estadoCambioRegistro ||
            estadoCambioVerProyectos ||
            estadoCambioInscribirProyecto ? (
              estadoCambioRegistro === true ? (
                <Registro />
              ) : estadoCambioVerProyectos === true ? (
                <VerProyectos />
              ) : (
                <InscribirProyecto />
              )
            ) : (
              <Inicio />
            )}
          </div>
        </div>
      </div>
      {/*---------------------------------------------------- OPCIONES--------------------------------------------- */}
      <div className="  justify-end ">
        <ul className="bg-blue-200 rounded-b-lg border-4 border-blue-500 border-double text-white mr-4 mt-4 pt-2">
          <li className=" flex justify-center">
            <h5 className="text-gray-900 font-bold  pb-2">
              <i class="fas fa-tools text-2xl"></i>
            </h5>
          </li>
          <li className="m-2 flex justify-end">
            <button
              className="bg-gray-900 rounded-l-lg p-3"
              onClick={() => {
                setEstadoCambioVerProyectos(true);
                setEstadoCambioRegistro(false);
                setEstadoCambioInscribirProyecto(false);
              }}
            >
              Ver mis proyectos
            </button>
          </li>
          <li className="m-2 flex justify-end">
            <button
              className="bg-gray-900 rounded-l-lg p-3"
              onClick={() => {
                setEstadoCambioRegistro(true);
                setEstadoCambioVerProyectos(false);
                setEstadoCambioInscribirProyecto(false);
              }}
            >
              Registrar nuevo proyecto
            </button>
          </li>
          <li className="m-2 flex justify-end">
            <button
              className="bg-gray-900 rounded-l-lg p-3"
              onClick={() => {
                setEstadoCambioInscribirProyecto(true);
                setEstadoCambioRegistro(false);
                setEstadoCambioVerProyectos(false);
              }}
            >
              Inscribirme a un nuevo proyecto
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Proyectos;
