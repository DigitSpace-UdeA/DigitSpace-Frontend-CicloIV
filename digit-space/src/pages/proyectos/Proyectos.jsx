import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTOS, GET_PROYECTO } from "../../graphql/proyectos/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Input, Textarea } from "../../components/input";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ButtonLoading from "../../components/ButtonLoanding";
// import PrivateComponent from "../../components/PrivateComponent";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Enum_EstadoProyecto,
  Enum_FaseProyecto,
} from "../../utils/EnumProyectos";
import { Dialog } from "@mui/material";
import Dropdown from "../../components/Dropdown";
import {
  EDITAR_PROYECTOADMINISTRADOR,
  EDITAR_PROYECTOLIDER,
} from "../../graphql/proyectos/mutations";
import useFormData from "../../hooks/useFormData";
import { GET_USUARIOS } from "../../graphql/usuarios/queries";

const Proyectos = () => {
  const { data: queryData, error, loading } = useQuery(GET_PROYECTOS);

  const [estadoCambioRegistro, setEstadoCambioRegistro] = useState(false);
  const [estadoCambioVerProyectos, setEstadoCambioVerProyectos] =
    useState(false);
  const [estadoCambioInscribirProyecto, setEstadoCambioInscribirProyecto] =
    useState(false);

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    console.log("datos del servidor, prueba", queryData);
  }, [queryData]);

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
    const ListadoProyectos = () => {
      if (queryData.Proyectos) {
        return (
          <div>
            {queryData.Proyectos.map((proyecto) => {
              return <AccordionProyecto proyecto={proyecto} />;
            })}
          </div>
        );
      }
      return <></>;
    };
    const AccordionProyecto = ({ proyecto }) => {
      const [showDialog, setShowDialog] = useState(false);
      const [showDialogLider, setShowDialogLider] = useState(false);
      return (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<i className="fas fa-chevron-down" />}
            >
              <div className="">
                <div className=" ">
                  {proyecto.nombre} - {proyecto.estadoProyecto} -
                  {proyecto.faseProyecto}
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex w-full justify-between">
                {/* <PrivateComponent roleList={["ADMINISTRADOR"]}> */}
                {/* aquí va el botón de editar y así  */}
                {/* </PrivateComponent> */}
                {/* <PrivateComponent roleList={["ESTUDIANTE"]}>
                <InscripcionProyecto
                  idProyecto={proyecto._id}
                  estado={proyecto.estado}
                  inscripciones={proyecto.inscripciones}
                />
              </PrivateComponent> */}
                {/* <div>Liderado Por: {proyecto.lider.correo}</div> */}
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
                  <i
                    className=" far fa-edit text-gray-600 hover:text-gray-400 cursor-pointer "
                    title="Editar Estudiante"
                    onClick={() => {
                      setShowDialogLider(true);
                    }}
                  />

                  <Link
                    to={`/main/proyectos/inscribirse/${proyecto._id}`}
                    className=""
                  >
                    <i
                      class="fas fa-sign-in-alt text-gray-600 hover:text-gray-400 cursor-pointer"
                      title="Inscribirse"
                    ></i>
                  </Link>
                  <Link
                    to={`/main/proyectos/avances/${proyecto._id}`}
                    className=""
                  >
                    <i
                      class="fas fa-plus-circle text-gray-600 hover:text-gray-400 cursor-pointer"
                      title="Registrar Avances"
                    ></i>
                  </Link>
                  {/* <PrivateComponent roleList={["ADMINISTRADOR"]}> */}
                  <i
                    className=" far fa-edit text-gray-600 hover:text-gray-400 cursor-pointer "
                    title="Editar administrador"
                    onClick={() => {
                      setShowDialog(true);
                    }}
                  ></i>
                  {/* </PrivateComponent> */}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Dialog
            open={showDialog}
            onClose={() => {
              setShowDialog(false);
            }}
          >
            <div className="p-3">
              <h1 className="font-bold text-blue-400">
                Editar Fase y estado del proyecto
              </h1>
              <FormEditProyecto _id={proyecto._id} />
            </div>
          </Dialog>
          <Dialog
            open={showDialogLider}
            onClose={() => {
              setShowDialogLider(false);
            }}
          >
            <div className="p-3">
              <h1 className="font-bold text-blue-400">
                Editar Fase y estado del proyecto
              </h1>
              <FormEditProyectoLider _id={proyecto._id} proyecto={proyecto} />
            </div>
          </Dialog>
        </>
      );
    };

    const FormEditProyecto = ({ _id }) => {
      const { form, formData, updateFormData } = useFormData();
      const [editarProyecto, { data: dataMutation, loading, error }] =
        useMutation(EDITAR_PROYECTOADMINISTRADOR);

      const submitForm = (e) => {
        e.preventDefault();
        editarProyecto({
          variables: {
            _id,
            campos: formData,
          },
        });
      };

      useEffect(() => {
        console.log("data mutation", dataMutation);
      }, [dataMutation]);

      return (
        <div className="">
          <form
            ref={form}
            onChange={updateFormData}
            onSubmit={submitForm}
            className="flex flex-col items-center"
          >
            {/* <Input
              label="Identificacion proyecto"
              type="text"
              name="nombre"
              defaultValue={proyecto.nombre}
              required={true}
              readonly="readonly"
            /> */}
            <Dropdown
              label="Estado del Proyecto"
              name="estadoProyecto"
              options={Enum_EstadoProyecto}
              required={true}
            />
            <Dropdown
              label="Fase proyecto"
              name="faseProyecto"
              required={true}
              options={Enum_FaseProyecto}
            />
            <ButtonLoading
              disabled={false}
              loading={loading}
              text="Confirmar"
            />
            {/* <button
              className="bg-gray-900  text-base rounded-b-lg p-3 ml-2 text-white hover:bg-indigo-500"
              onClick={() => {
                setShowDialog(false);
              }}
            >
              Cancelar <i class="far fa-window-close text-red-400"></i>
            </button> */}
          </form>
        </div>
      );
    };

    const FormEditProyectoLider = ({ _id, proyecto }) => {
      const { form, formData, updateFormData } = useFormData();
      const [editarProyecto, { data: dataMutation, loading, error }] =
        useMutation(EDITAR_PROYECTOLIDER);

      const submitForm = (e) => {
        e.preventDefault();
        editarProyecto({
          variables: {
            _id,
            campos: formData,
          },
        });
      };

      useEffect(() => {
        console.log("data mutation", dataMutation);
      }, [dataMutation]);

      return (
        <div className="">
          <form
            ref={form}
            onChange={updateFormData}
            onSubmit={submitForm}
            className="flex flex-col items-center"
          >
            <Input
              label="Nombre de proyecto"
              type="text"
              name="nombre"
              defaultValue={proyecto.nombre}
              required={true}
            />
            {/* <Input
              label="Presupuesto de proyecto"
              type="number"
              name="presupuesto"
              defaultValue={proyecto.presupuesto}
              required={true}
            /> */}

            <ButtonLoading
              disabled={false}
              loading={loading}
              text="Confirmar"
            />
            {/* <button
              className="bg-gray-900  text-base rounded-b-lg p-3 ml-2 text-white hover:bg-indigo-500"
              onClick={() => {
                setShowDialog(false);
              }}
            >
              Cancelar <i class="far fa-window-close text-red-400"></i>
            </button> */}
          </form>
        </div>
      );
    };

    const Objetivo = ({ tipo, descripcion }) => {
      const [editarObjetivo, setEditarObjetivo] = useState(false);
      return (
        <div className="justify-center items-center">
          <div className="mx-5 bg-gray-50 pt-1 text-center">{tipo}</div>
          <div className="mx-5 bg-gray-50 p-2">{descripcion}</div>
          {/* <PrivateComponent roleList={["ADMINISTRADOR"]}> */}
          <div className="flex justify-center ">
            <i
              className=" far fa-edit  bg-gray-50 text-gray-600 hover:text-gray-400 cursor-pointer text-center "
              title="Editar Objetivo"
              onClick={() => {
                setEditarObjetivo(true);
              }}
            ></i>
          </div>
          {/* </PrivateComponent> */}
        </div>
      );
    };

    // const AccordionProyecto = ({ proyecto }) => {
    //   var id = proyecto._id;
    //   var gg = id;
    //   return (
    //     <Accordion>
    //       <AccordionSummary expandIcon={<i class="fas fa-chevron-down"></i>}>
    //         <div>
    //           <div>
    //             {proyecto.nombre} - {proyecto.estadoProyecto} -
    //             {proyecto.faseProyecto} - {proyecto._id}
    //           </div>
    //         </div>
    //       </AccordionSummary>
    //       <AccordionDetails>
    //         <div className="flex flex-col w-full justify-between">
    //           <div className="flex">
    //             <div className="flex">
    //               {proyecto.objetivos.map((objetivo) => {
    //                 return (
    //                   <Objetivo
    //                     tipo={objetivo.tipo}
    //                     descripcion={objetivo.descripcion}
    //                   />
    //                 );
    //               })}
    //             </div>
    //             <div className="flex flex-col ">
    //               <Link to={`/main/proyectos/editar/${proyecto._id}`} name="jj">
    //                 <i
    //                   className=" far fa-edit text-gray-600 hover:text-gray-400 cursor-pointer "
    //                   title="Editar Estudiante"
    //                 />
    //               </Link>
    //               <Link to={`/main/proyectos/inscribirse/${id}`} className="">
    //                 <i
    //                   class="fas fa-sign-in-alt text-gray-600 hover:text-gray-400 cursor-pointer"
    //                   title="Inscribirse"
    //                 ></i>
    //               </Link>
    //               {/* <PrivateComponent roleList={["ADMINISTRADOR"]}> */}
    //               <i
    //                 className=" far fa-edit text-gray-600 hover:text-gray-400 cursor-pointer "
    //                 title="Editar administrador"
    //                 onClick={() => {
    //                   setShowDialog(true);
    //                 }}
    //               ></i>
    //               {/* </PrivateComponent> */}
    //               <h1 className="font-bold text-blue-400">{id}</h1>
    //             </div>
    //           </div>
    //         </div>
    //         <div>
    //           <Dialog
    //             open={showDialog}
    //             onClose={() => {
    //               setShowDialog(false);
    //             }}
    //           >
    //             <div className="p-3">
    //               <div>
    //                 <h1 className="font-bold text-blue-400">
    //                   Editar Fase y estado del proyecto
    //                 </h1>
    //                 <h1 className="font-bold text-blue-400">{id}</h1>
    //                 <EditAdministrador ide={gg} />
    //               </div>
    //             </div>
    //           </Dialog>
    //         </div>
    //       </AccordionDetails>
    //     </Accordion>
    //   );
    // };

    // const Objetivo = ({ tipo, descripcion }) => {
    //   return (
    //     <div className=" justify-center  ">
    //       <div className="mx-5 bg-gray-100 pt-1 text-center ">{tipo}</div>
    //       <div className="mx-5 bg-gray-100 p-2">{descripcion}</div>
    //     </div>
    //   );
    // };
    // const EditAdministrador = ({ ide }) => {
    //   const { form, formData, updateFormData } = useFormData();
    //   const [
    //     editarProyectoAdministrador,
    //     { data: dataMutation, loading, error },
    //   ] = useMutation(EDITAR_PROYECTOADMINISTRADOR);

    //   const submitForm = (e) => {
    //     e.preventDefault();
    //     editarProyectoAdministrador({
    //       variables: { ide, campos: formData },
    //     });
    //   };

    //   useEffect(() => {
    //     console.log("id", ide);
    //   }, ide);

    //   useEffect(() => {
    //     console.log("veamos", dataMutation);
    //   }, [dataMutation]);

    //   return (
    //     <div>
    //       <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
    //         <Input
    //           label="Identificacion proyecto"
    //           type="text"
    //           name="_id"
    //           defaultValue={ide}
    //           required={true}
    //           readonly="readonly"
    //         />
    //         <Dropdown
    //           label="Fase proyecto"
    //           name="faseProyecto"
    //           required={true}
    //           options={Enum_FaseProyecto}
    //         />
    //         <Dropdown
    //           label="Estado proyecto"
    //           name="estadoProyecto"
    //           required={true}
    //           options={Enum_EstadoProyecto}
    //         />
    //         <div className="flex justify-center">
    //           <ButtonLoading
    //             disabled={false}
    //             loading={false}
    //             text=" Confirmar "
    //           />

    //           <button
    //             className="bg-gray-900  text-base rounded-b-lg p-3 ml-2 text-white hover:bg-indigo-500"
    //             onClick={() => {
    //               setShowDialog(false);
    //             }}
    //           >
    //             Cancelar <i class="far fa-window-close text-red-400"></i>
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   );
    // };

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
        </div>
      </div>
    );
  };

  const Registro = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = year + "-" + month + "-" + day;
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    // document.getElementById("theDate").value = today;

    const [listaUsuarios, setListaUsuarios] = useState({});
    const [identificacionUsuario, setIdentificacionUsuario] = useState({});
    const { data, loading, error } = useQuery(GET_USUARIOS, {
      variables: {
        filtro: { rol: "LIDER" },
      },
    });

    console.log("aversamonda", data);

    useEffect(() => {
      console.log("los datos son", data);
      if (data) {
        const lu = {};
        data.Usuarios.forEach((elemento) => {
          lu[elemento._id] = elemento.nombre;
        });
        setListaUsuarios(lu);
      }
    }, [data]);

    useEffect(() => {
      console.log("los datos son", data);
      if (data) {
        const lu = {};
        data.Usuarios.forEach((elemento) => {
          lu[elemento._id] = elemento.identificacion;
        });
        setIdentificacionUsuario(lu);
      }
    }, [data]);

    if (queryData.Proyectos) {
      if (loading) return <div>cargando...</div>;

      return (
        <div>
          <div>
            <h1 className="mr-2 text-2xl text-center mb-5 p-3 rounded-lg">
              Registrar Proyecto
            </h1>
            <form className="flex">
              <div>
                {/* <Dropdown
                  options={listaUsuarios}
                  name="lider"
                  required={true}
                /> */}
                <Dropdown
                  label="Documento"
                  options={identificacionUsuario}
                  name="identificacion"
                />
                <Input label="Nombre del proyecto" type="text" name="nombre" />
                <Input
                  label="fecha de inicio"
                  type="date"
                  defaultValue={today}
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
                <Dropdown
                  label="Nombre completo"
                  name="nombre"
                  options={listaUsuarios}
                  required={true}
                />
                <Input label="Presupuesto" type="text" name="presupuesto" />
                <Input
                  label="Fecha de terminación"
                  type="date"
                  name="fechaFinal"
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
        </div>
      );
    }
    return <></>;
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
