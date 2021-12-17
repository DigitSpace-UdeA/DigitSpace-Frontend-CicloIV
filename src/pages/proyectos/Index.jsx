import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { PROYECTOS } from "graphql/proyectos/queries";
import DropDown from "components/Dropdown";
import { Dialog } from "@mui/material";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enums";
import ButtonLoading from "components/ButtonLoading";
import {
  EDITAR_PROYECTO,
  EDITAR_PROYECTOADMINISTRADOR,
} from "graphql/proyectos/mutations";
import useFormData from "hooks/useFormData";
import PrivateComponent from "../../components/PrivateComponent";
import { Link } from "react-router-dom";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from "components/Accordion";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import { Enum_TipoObjetivo } from "../../utils/enums";
import { EDITAR_OBJETIVO } from "../../graphql/proyectos/mutations";

const IndexProyectos = () => {
  const { data: queryData, loading, error } = useQuery(PROYECTOS);

  useEffect(() => {
    console.log("datos proyecto", queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyectos) {
    return (
      <div className="p-10 flex flex-col">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Listado de los Proyectos
          </h1>
        </div>
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <div className="my-2 self-end">
            <button className="bg-red-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-red-400">
              <Link to="/proyectos/nuevo">Crear un Nuevo Proyecto</Link>
            </button>
          </div>
        </PrivateComponent>
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
    <div>
      <>
        <AccordionStyled>
          <AccordionSummaryStyled
            expandIcon={<i className="fas fa-chevron-down" />}
          >
            <div className="">
              <div className=" ">
                {proyecto.nombre} - {proyecto.estadoProyecto} -
                {proyecto.faseProyecto}
              </div>
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
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
                      proyectoObjetivo={objetivo}
                      _id={proyecto._id}
                      tipo={objetivo.tipo}
                      descripcion={objetivo.descripcion}
                      ObjetivoArray={proyecto.objetivos}
                    />
                  );
                })}
              </div>
              <div className="flex flex-col ">
                <PrivateComponent roleList={["LIDER", "ADMINISTRADOR"]}>
                  <i
                    className=" far fa-edit text-gray-600 hover:text-gray-400 cursor-pointer "
                    title="Editar Estudiante"
                    onClick={() => {
                      setShowDialogLider(true);
                    }}
                  />
                </PrivateComponent>
                <PrivateComponent roleList={["ESTUDIANTE", "ADMINISTRADOR"]}>
                  <Link
                    to={`/proyectos/inscribirse/${proyecto._id}`}
                    className=""
                  >
                    <i
                      class="fas fa-sign-in-alt text-gray-600 hover:text-gray-400 cursor-pointer"
                      title="Inscribirse"
                    ></i>
                  </Link>
                </PrivateComponent>
                <PrivateComponent roleList={["ESTUDIANTE", "ADMINISTRADOR"]}>
                  <Link
                    to={`/proyectos/registrarAvances/${proyecto._id}`}
                    className=""
                  >
                    <i
                      class="fas fa-plus-circle text-gray-600 hover:text-gray-400 cursor-pointer"
                      title="Registrar Avances"
                    />
                  </Link>
                </PrivateComponent>
                <PrivateComponent
                  roleList={["ESTUDIANTE", "LIDER", "ADMINISTRADOR"]}
                >
                  <Link
                    to={`/proyectos/listarAvances/${proyecto._id}`}
                    className=""
                  >
                    <i
                      class="fas fa-list text-gray-600 hover:text-gray-400 cursor-pointer"
                      title="listar Avances"
                    />
                  </Link>
                </PrivateComponent>
                <PrivateComponent roleList={["ADMINISTRADOR"]}>
                  <i
                    className=" far fa-edit text-gray-600 hover:text-gray-400 cursor-pointer "
                    title="Editar administrador"
                    onClick={() => {
                      setShowDialog(true);
                    }}
                  />
                </PrivateComponent>
              </div>
            </div>
          </AccordionDetailsStyled>
        </AccordionStyled>
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

      {/* jjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}

      {/* <>
        <AccordionStyled>
          <AccordionSummaryStyled
            expandIcon={<i className="fas fa-chevron-down" />}
          >
            <div className="flex w-full justify-between">
              <div className="uppercase font-bold text-gray-100 ">
                {proyecto.nombre} - {proyecto.estado}
              </div>
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <PrivateComponent roleList={["ADMINISTRADOR"]}>
              <i
                className="mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400"
                onClick={() => {
                  setShowDialog(true);
                }}
              />
            </PrivateComponent>
            <PrivateComponent roleList={["ESTUDIANTE"]}>
              <InscripcionProyecto
                idProyecto={proyecto._id}
                estado={proyecto.estado}
                inscripciones={proyecto.inscripciones}
              />
            </PrivateComponent>
            <div>
              {" "}
              <span className="font-bold">Liderado por:</span>{" "}
              {proyecto.lider.correo}
            </div>
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
          </AccordionDetailsStyled>
        </AccordionStyled>
        <Dialog
          open={showDialog}
          onClose={() => {
            setShowDialog(false);
          }}
        >
          <FormEditProyecto _id={proyecto._id} />
        </Dialog>
      </> */}
    </div>
  );
};

const FormEditProyectoLider = ({ _id, proyecto }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

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

        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
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

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(
    EDITAR_PROYECTOADMINISTRADOR
  );

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
        <DropDown
          label="Estado del Proyecto"
          name="estadoProyecto"
          options={Enum_EstadoProyecto}
          required={true}
        />
        <DropDown
          label="Fase proyecto"
          name="faseProyecto"
          required={true}
          options={Enum_FaseProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
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
// const FormEditProyecto = ({ _id }) => {
//   const { form, formData, updateFormData } = useFormData();
//   const [editarProyecto, { data: dataMutation, loading, error }] =
//     useMutation(EDITAR_PROYECTO);

//   const submitForm = (e) => {
//     e.preventDefault();
//     editarProyecto({
//       variables: {
//         _id,
//         campos: formData,
//       },
//     });
//   };

//   useEffect(() => {
//     console.log("data mutation", dataMutation);
//   }, [dataMutation]);

//   return (
//     <div className="p-4">
//       <h1 className="font-bold">Modificar el Estado del Proyecto</h1>
//       <form
//         ref={form}
//         onChange={updateFormData}
//         onSubmit={submitForm}
//         className="flex flex-col items-center"
//       >
//         <DropDown
//           label="Estado del Proyecto"
//           name="estado"
//           options={Enum_EstadoProyecto}
//         />
//         <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
//       </form>
//     </div>
//   );
// };

const Objetivo = ({
  tipo,
  descripcion,
  _id,
  proyectoObjetivo,
  ObjetivoArray,
}) => {
  const [estadoEditarObjetivo, setEstadoEditarObjetivo] = useState(false);
  const [estadoObjetivoEditado, setEstadoObjetivoEditado] = useState(false);

  console.log("averr", proyectoObjetivo);
  const VerObjetivos = ({}) => {
    return (
      <div className="justify-center items-center mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col shadow-xl">
        <div className="mx-5 bg-gray-50 pt-1 text-center">{tipo}</div>
        <div className="mx-5 bg-gray-50 p-2">{descripcion}</div>
        <PrivateComponent roleList={["ADMINISTRADOR"]}>
          <div className="flex justify-center ">
            <i
              className=" far fa-edit  bg-gray-50 text-gray-600 hover:text-gray-400 cursor-pointer text-center "
              title="Editar Objetivo"
              onClick={() => {
                setEstadoEditarObjetivo(true);
              }}
            ></i>
          </div>
        </PrivateComponent>
      </div>
    );
  };

  const EditarObjetivo = ({ _idProyecto, proyectoObjetivo, ObjetivoArray }) => {
    console.log("a ver", _idProyecto);
    console.log("id de objetivo", proyectoObjetivo);
    console.log("peremosfuncione", ObjetivoArray);

    const index = ObjetivoArray.indexOf(proyectoObjetivo);
    console.log("index", index);
    const { form, formData, updateFormData } = useFormData();
    const [
      editarObjetivo,
      { data: dataMutation, loading, error: mutationError },
    ] = useMutation(EDITAR_OBJETIVO);

    const submitForm = (e) => {
      // const IndexObjetivo =({})={
      //   ObjetivoArray.indexOf(proyectoObjetivo)
      // };
      e.preventDefault();
      editarObjetivo({
        variables: {
          indexObjetivo: index,
          idProyecto: _idProyecto,
          campos: formData,
        },
      });
    };
    useEffect(() => {
      if (mutationError) {
        toast.error("Error modificando el usuario");
      }
    }, [mutationError]);

    useEffect(() => {
      if (dataMutation) {
        toast.success("Objetivo editado con éxito");
      }
    }, [dataMutation]);

    return (
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <div className="justify-center items-center mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col shadow-xl">
          <div className="mx-5 bg-gray-50 pt-1 text-center">
            <Input
              name="tipo"
              label="Tipo de objetivo"
              required={true}
              type="text"
              defaultValue={tipo}
              readonly="readonly"
            />
          </div>
          <div className="mx-5 bg-gray-50 p-2">
            <Textarea
              name="descripcion"
              label="Tipo de objetivo"
              required={true}
              type="text"
              defaultValue={descripcion}
            />
          </div>
          <div className="flex justify-center ">
            <i
              className=" fas fa-window-close  bg-gray-50 text-gray-600 hover:text-gray-400 cursor-pointer text-center "
              title="Cancelar"
              onClick={() => {
                setEstadoEditarObjetivo(false);
              }}
            ></i>
          </div>
          <ButtonLoading
            disabled={false}
            loading={loading}
            text="Confirmar"
            // onClick={() => {
            //   setEstadoObjetivoEditado(true);
            // }}
          />
        </div>
      </form>
    );
  };

  const Editado = ({}) => {
    return <div>Objetivo Editado, con éxito</div>;
  };

  return (
    <div>
      {estadoEditarObjetivo === true ? (
        estadoObjetivoEditado === true ? (
          <Editado />
        ) : (
          <EditarObjetivo
            _idProyecto={_id}
            proyectoObjetivo={proyectoObjetivo}
            ObjetivoArray={ObjetivoArray}
          />
        )
      ) : (
        <VerObjetivos />
      )}
    </div>
  );
};

// const Objetivo = ({ tipo, descripcion }) => {
//   return (
//     <div className="mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl">
//       <div className="text-lg font-bold">{tipo}</div>
//       <div>{descripcion}</div>
//       <PrivateComponent roleList={["ADMINISTRADOR"]}>
//         <div>Editar</div>
//       </PrivateComponent>
//     </div>
//   );
// };

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState("");
  const [crearInscripcion, { data, loading, error }] =
    useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success("La inscripción fue creada con exito");
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id },
    });
  };

  return (
    <>
      {estadoInscripcion !== "" ? (
        <span>
          El usuario ya está inscrito en este proyecto; su estado es{" "}
          {estadoInscripcion}
        </span>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === "INACTIVO"}
          loading={loading}
          text="Inscribirme en este proyecto"
        />
      )}
    </>
  );
};

export default IndexProyectos;
