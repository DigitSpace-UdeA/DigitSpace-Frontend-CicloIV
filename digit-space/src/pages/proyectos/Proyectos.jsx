import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS } from "../../graphql/usuarios/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import EditarProyecto from "./EditarProyecto";

const Proyectos = () => {
  const [estadoCambioRegistro, setEstadoCambioResgistro] = useState(false);
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
                      {/* <td>{Enum_Estado_Proyecto[u.estadoProyecto]}</td>
                      <td>{Enum_Fase_Proyecto[u.faseProyecto]}</td> */}
                      <td>{u.lider}</td>
                      <td>
                        <i class="fas fa-plus-circle"></i>
                        <i class="far fa-edit"></i>
                        <Link to={`proyectos/editar/${u._id}`}>
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
      <div className="box-border rounded-tr-lg border-8 border-gray-150 border-double p-3 my-3">
        <h1 className="mr-2 text-2xl text-center mb-5 bg-blue-200 p-3 rounded-lg">
          Registrar Proyecto
        </h1>
        <div>
          <form className="text-sm">
            <div className="flex">
              <div>
                {/*--------------------------- COLUMNA IZQUIERDA ------------------------ */}
                <ul>
                  <li className="mb-3">
                    <label className="mr-2 text-base">Identificación: </label>
                    <input
                      type="text"
                      className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    />
                  </li>
                  <li className="mb-3 ">
                    <label className="mr-2 text-base">
                      Nombre del proyecto:{" "}
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    />
                  </li>
                  <li className="mb-3">
                    <label className="mr-2 text-base">Fecha de inicio: </label>
                    <input
                      type="date"
                      className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    />
                  </li>
                  <li className="mb-3">
                    <label className="mr-2 text-base">
                      Estado del proyecto:{" "}
                    </label>
                    <select
                      className=" bg-gray-50 focus:outline-none border-2 rounded-full py-1 px-6 hover:border-blue-300 focus:border-blue-300 focus:ring-blue-300 
                        flex-col  justify-center items-center"
                      type="text"
                      name="estado"
                      value="Inactivo"
                    >
                      <option value="Inactivo">Inactivo</option>
                      <option value="Activo">Activo</option>
                    </select>
                  </li>
                </ul>
                {/*--------------------------- COLUMNA IZQUIERDA ------------------------ */}
              </div>
              <div>
                {/*--------------------------- COLUMNA DERECHA ------------------------ */}
                <ul>
                  <li className="mb-3 ml-4">
                    <label className="mr-2 text-base">Nombre completo: </label>
                    <input
                      type="text"
                      className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    />
                  </li>
                  <li className="mb-3 ml-4">
                    <label className="mr-2 text-base">Presupuesto: </label>
                    <input
                      type="number"
                      className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    />
                  </li>
                  <li className="mb-3 ml-4">
                    <label className="mr-2 text-base">
                      Fecha de terminación:{" "}
                    </label>
                    <input
                      type="date"
                      className="bg-gray-50 rounded-full hover:border-blue-300 border-2 py-1 px-6   focus:outline-none focus:ring-2 focus:ring-blue-300 "
                    />
                  </li>
                  <li className="mb-3 ml-4">
                    <label className="mr-2 text-base">
                      Fase del proyecto:{" "}
                    </label>
                    <select
                      className=" bg-gray-50 focus:outline-none border-2 rounded-full py-1 px-6 hover:border-blue-300 focus:border-blue-300 focus:ring-blue-300 
                        flex-col  justify-center items-center"
                      type="text"
                      name="estado"
                      value="Null"
                    >
                      <option value="Inicio">Inicio</option>
                      <option value="Desarrollo">Desarrollo</option>
                      <option value="Terminado">Terminado</option>
                      <option value="Null">Null</option>
                    </select>
                  </li>
                </ul>
                {/*--------------------------- COLUMNA DERECHA ------------------------ */}
              </div>
            </div>
            <div>
              {/*--------------------------- OBJETIVOS------------------------ */}
              <ul>
                <li className="mb-3">
                  <div>
                    <ul>
                      <li>
                        <label className="mr-2 text-base">
                          Objetivo general:
                        </label>
                      </li>
                      <li className="flex justify-center mt-3">
                        <textarea
                          name="Objetivo general"
                          rows="5"
                          cols="40"
                          className="bg-gray-50 rounded-b-lg px-10 py-2 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                        >
                          Escribe aquí tu objetivo general
                        </textarea>
                      </li>
                    </ul>
                  </div>
                </li>
                <div className="">
                  <ul>
                    <li>
                      <label className="mr-2 text-base">
                        Objetivos especificos:
                      </label>
                    </li>
                    <li className="flex justify-center mt-3">
                      <div className="">
                        <ul>
                          <div className="flex">
                            <li>
                              <textarea
                                type="text"
                                rows="3"
                                cols="40"
                                className="bg-gray-50 rounded-b-lg px-10 py-2 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                              >
                                Escribe aquí tu objetivo especifico
                              </textarea>
                            </li>
                            <li>
                              <textarea
                                type="text"
                                rows="3"
                                cols="40"
                                className="bg-gray-50  ml-4 rounded-b-lg px-10 py-2 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                              >
                                Escribe aquí tu objetivo especifico
                              </textarea>
                            </li>
                          </div>
                          <li>
                            <textarea
                              type="text"
                              rows="3"
                              cols="40"
                              className="bg-gray-50 rounded-b-lg px-10 py-2 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            >
                              Escribe aquí tu objetivo especifico
                            </textarea>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </ul>
              {/*--------------------------- OBJETIVOS------------------------ */}
            </div>
          </form>
        </div>
        <div className=" flex justify-center  mt-3">
          <button className="bg-gray-900  text-base rounded-b-lg p-3 text-white">
            Guardar <i class="far fa-save text-green-400"></i>
          </button>
          <button
            className="bg-gray-900  text-base rounded-b-lg p-3 ml-2 text-white "
            onClick={() => {
              setEstadoCambioResgistro(false);
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
  // const VerProyectos = () => {};
  // useEffect(() => {
  //   console.log("estoy escuchando el botón");
  // }, [setEstadoCambioResgistro]);

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
                setEstadoCambioResgistro(false);
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
                setEstadoCambioResgistro(true);
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
                setEstadoCambioResgistro(false);
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
