import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTOS } from "../../graphql/proyectos/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Input, Textarea } from "../../components/input";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ButtonLoading from "../../components/ButtonLoanding";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Enum_EstadoProyecto,
  Enum_FaseProyecto,
} from "../../utils/EnumProyectos";
import { Dialog } from "@mui/material";
import Dropdown from "../../components/Dropdown";
import { EDITAR_PROYECTOADMINISTRADOR } from "../../graphql/proyectos/mutations";
import useFormData from "../../hooks/useFormData";

const Proyectos = () => {
  const [estadoCambioRegistro, setEstadoCambioRegistro] = useState(false);
  const [estadoCambioVerProyectos, setEstadoCambioVerProyectos] =
    useState(false);
  const [estadoCambioInscribirProyecto, setEstadoCambioInscribirProyecto] =
    useState(false);
  const { data, error, loading } = useQuery(GET_PROYECTOS);
  const [showDialog, setShowDialog] = useState(false);

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

  const ListadoProyectos = () => {
    if (data.Proyectos) {
      return (
        <div>
          {data.Proyectos.map((proyecto) => {
            return <AccordionProyecto proyecto={proyecto} />;
          })}{" "}
        </div>
      );
    }
  };

  const AccordionProyecto = ({ proyecto }) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<i class="fas fa-chevron-down" key={proyecto._id}></i>}
        >
          <div>
            <div>
              {proyecto.nombre} - {proyecto.estadoProyecto}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col w-full justify-between">
            {/* <div className="p-2">
              {!editMode ? (
                <span> {proyecto.estadoProyecto}</span>
              ) : (
                <div>
                  <select>
                    <option value="">Activo</option>
                    <option value="">Inactivo</option>
                    <option value="">Terminado</option>
                  </select>
                </div>
              )}
            </div> */}
            <div className="flex">
              <div className="flex">
                {proyecto.objetivos.map((objetivo) => {
                  return (
                    <Objetivo
                      tipo={objetivo.tipo}
                      descripcion={objetivo.descripcion}
                    />
                  );
                })}
              </div>
              <div className="flex flex-col ">
                <Link to={`/main/proyectos/editar/${proyecto._id}`} name="jj">
                  <i
                    className=" far fa-edit text-gray-600 hover:text-gray-400 cursor-pointer "
                    title="Editar Estudiante"
                  />
                </Link>
                <Link
                  to={`/main/proyectos/inscribirse/${proyecto._id}`}
                  className=""
                >
                  <i
                    class="fas fa-sign-in-alt text-gray-600 hover:text-gray-400 cursor-pointer"
                    title="Inscribirse"
                  ></i>
                </Link>
                <i
                  className=" far fa-edit text-gray-600 hover:text-gray-400 cursor-pointer "
                  title="Editar administrador"
                  onClick={() => {
                    setShowDialog(true);
                  }}
                ></i>
              </div>
            </div>
          </div>
        </AccordionDetails>
        <Dialog open={showDialog}>
          <div className="p-3">
            <div>
              <h1 className="font-bold text-blue-400">
                Editar Fase y estado del proyecto
              </h1>
              <EditAdministrador _id={proyecto._id} />
            </div>
          </div>
        </Dialog>
      </Accordion>
    );
  };

  const Objetivo = ({ tipo, descripcion }) => {
    return (
      <div className=" justify-center  ">
        <div className="mx-5 bg-gray-100 pt-1 text-center ">{tipo}</div>
        <div className="mx-5 bg-gray-100 p-2">{descripcion}</div>
      </div>
    );
  };

  const EditAdministrador = ({ _id }) => {
    const { form, formData, updateFormData } = useFormData();
    const [
      editarProyectoAdministrador,
      { data: dataMutation, loading, error },
    ] = useMutation(EDITAR_PROYECTOADMINISTRADOR);

    const submitForm = (e) => {
      e.preventDefault();
      editarProyectoAdministrador({
        variables: { _id, campos: formData },
      });
    };

    useEffect(() => {
      console.log("veamos", dataMutation);
    }, [dataMutation]);

    return (
      <div>
        <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
          <Dropdown
            label="Fase proyecto"
            name="faseProyecto"
            required={true}
            options={Enum_FaseProyecto}
          />
          <Dropdown
            label="Estado proyecto"
            name="estadoProyecto"
            required={true}
            options={Enum_EstadoProyecto}
          />
          <div className="flex justify-center">
            <ButtonLoading
              disabled={false}
              loading={false}
              text=" Confirmar "
            />

            <button
              className="bg-gray-900  text-base rounded-b-lg p-3 ml-2 text-white hover:bg-indigo-500"
              onClick={() => {
                setShowDialog(false);
              }}
            >
              Cancelar <i class="far fa-window-close text-red-400"></i>
            </button>
          </div>
        </form>
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

        <div className="flex flex-col">
          <div className="p-10">
            <ListadoProyectos />
          </div>

          {/* <div className=" pl-3">
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
                        {/* <td>{u.lider}</td> */}
          {/* <td>
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
          </div> */}
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
            <Input
              label="fecha de inicio"
              type="date"
              name="identificacion"
              readonly="readonly"
            />
            <Input
              label="Estado del proyecto"
              type="text"
              defaultValue="Inactivo"
              name="estadoProyecto"
              readonly="readonly"
            />
          </div>
          <div className=" pl-4">
            <Input label="Nombre completo" type="text" name="identificacion" />
            <Input label="Presupuesto" type="text" name="identificacion" />
            <Input
              label="Fecha de terminación"
              type="date"
              name="identificacion"
              readonly="readonly"
            />
            <Input
              label="Fase del proyecto"
              type="text"
              defaultValue="Nulo"
              name="faseProyecto"
              readonly="readonly"
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
