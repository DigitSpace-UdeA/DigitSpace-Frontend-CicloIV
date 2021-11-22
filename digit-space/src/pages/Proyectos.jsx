import React, { useState } from "react";

const Proyectos = () => {
  const [estadoCambio, setEstadoCambio] = useState(false);

  const verRegistrar = () => {
    setEstadoCambio(!estadoCambio);
  };

  const Inicio = () => {
    return (
      <div>
        <h1 className="bg-pink-300">Hola soy el index</h1>
      </div>
    );
  };

  const Registro = () => {
    return (
      <div className="box-border rounded-tr-lg border-8 border-gray-150 border-double p-3 my-3 ">
        <h1 className="mr-2 text-2xl text-center mb-5 bg-blue-200 p-3 rounded-lg">
          Registrar Proyecto
        </h1>
        <div>
          {/* ---------------------------------------FORMULARIO DE REGISTRO---------------------------------- */}
          <form>
            <ul>
              <li className="mb-3">
                <label className="mr-2 text-xl">Identificación: </label>
                <input
                  type="text"
                  className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </li>
              <li className="mb-3">
                <label className="mr-2 text-xl">Nombre completo: </label>
                <input
                  type="text"
                  className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </li>
              <li className="mb-3">
                <label className="mr-2 text-xl">Nombre del proyecto: </label>
                <input
                  type="text"
                  className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </li>

              <li className="mb-3">
                <label className="mr-2 text-xl">Presupuesto: </label>
                <input
                  type="number"
                  className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </li>
              <li className="mb-3">
                <label className="mr-2 text-xl">Fecha de inicio: </label>
                <input
                  type="date"
                  className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </li>
              <li className="mb-3">
                <label className="mr-2 text-xl">Fecha de terminación: </label>
                <input
                  type="date"
                  className="bg-gray-50 rounded-full hover:border-blue-300 border-2 py-1 px-6   focus:outline-none focus:ring-2 focus:ring-blue-300 "
                />
              </li>
              <li className="mb-3">
                <label className="mr-2 text-xl">Estado del proyecto: </label>
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
              <li className="mb-3">
                <label className="mr-2 text-xl">Fase del proyecto: </label>
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
              {/* -------------------------------------OBJETIVOS---------------------------------------- */}
              <li className="mb-3">
                <label className="mr-2 text-xl">Objetivos generales</label>
                <input
                  type="text"
                  className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <button className="bg-gray-900  text-xl rounded-b-lg p-3 text-white">
                  <i class="fas fa-plus"></i>
                </button>
              </li>
              <li className="mb-3">
                <label className="mr-2 text-xl">Objetivos especificos</label>
                <input
                  type="text"
                  className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </li>
            </ul>
          </form>
        </div>
        <div className=" flex justify-center mt-3">
          <button className="bg-gray-900  text-xl rounded-b-lg p-3 text-white">
            Guardar <i class="far fa-save"></i>
          </button>
        </div>
      </div>
    );
  };

  // const VerProyectos = () => {};
  // useEffect(() => {
  //   console.log("estoy escuchando el botón");
  // }, [setEstadoCambio]);

  return (
    <div className="flex justify-between">
      {/*--------------------------------- REGISTRO / LISTADO DE PROYECTOS ------------------------------------*/}
      <div>
        <div className="mx-8 justify-center">
          <div>{estadoCambio ? <Registro /> : <Inicio />}</div>
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
            <button className="bg-gray-900 rounded-l-lg p-3">
              Ver mis proyectos
            </button>
          </li>
          <li className="m-2 flex justify-end">
            <button
              className="bg-gray-900 rounded-l-lg p-3"
              onClick={verRegistrar}
            >
              Registrar nuevo proyecto
            </button>
          </li>
          <li className="m-2 flex justify-end">
            <button className="bg-gray-900 rounded-l-lg p-3">
              Inscribirme a un nuevo proyecto
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Proyectos;
