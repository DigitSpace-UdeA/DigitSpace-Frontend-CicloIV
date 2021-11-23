<form>
  <ul>
    <li className="mb-3">
      <label className="mr-2 text-xl">Identificación: </label>
      <input
        type="text"
        className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
      />
    </li>
    <li className="mb-3 ">
      <label className="mr-2 text-xl">Nombre del proyecto: </label>
      <input
        type="text"
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
  </ul>

  <ul>
    <li className="mb-3 ml-4">
      <label className="mr-2 text-xl">Nombre completo: </label>
      <input
        type="text"
        className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
      />
    </li>
    <li className="mb-3 ml-4">
      <label className="mr-2 text-xl">Presupuesto: </label>
      <input
        type="number"
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
  </ul>

  <ul>
    <li className="mb-3">
      <div>
        <ul>
          <li>
            <label className="mr-2 text-xl">Objetivo general:</label>
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
    <div className="field_wrapper">
      <ul>
        <li>
          <label className="mr-2 text-xl">Objetivos especificos:</label>
          {/* <button
                      id="add_field"
                      className="bg-gray-900  text-s rounded-full py-1 px-2  text-white"
                      value="adicionar"
                    >
                      <i class="far fa-window-close"></i>{" "}
                    </button> */}
        </li>
        <li className="flex justify-center mt-3">
          <div className="flex">
            <ul>
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
</form>;

// VIEJO CODIGOOOO

{
  /* ---------------------------------------FORMULARIO DE REGISTRO---------------------------------- */
}
<form>
  <ul>
    <div className="flex ">
      <li className="mb-3">
        <label className="mr-2 text-xl">Identificación: </label>
        <input
          type="text"
          className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
      </li>
      <li className="mb-3 ml-4">
        <label className="mr-2 text-xl">Nombre completo: </label>
        <input
          type="text"
          className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
      </li>
    </div>
    <div className="flex ">
      <li className="mb-3 ">
        <label className="mr-2 text-xl">Nombre del proyecto: </label>
        <input
          type="text"
          className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
      </li>

      <li className="mb-3 ml-4">
        <label className="mr-2 text-xl">Presupuesto: </label>
        <input
          type="number"
          className="bg-gray-50 rounded-full py-1 px-6 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
      </li>
    </div>
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
      <div>
        <ul>
          <li>
            <label className="mr-2 text-xl">Objetivo general:</label>
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
    <div className="field_wrapper">
      <ul>
        <li>
          <label className="mr-2 text-xl">Objetivos especificos:</label>
          {/* <button
                      id="add_field"
                      className="bg-gray-900  text-s rounded-full py-1 px-2  text-white"
                      value="adicionar"
                    >
                      <i class="far fa-window-close"></i>{" "}
                    </button> */}
        </li>
        <li className="flex justify-center mt-3">
          <div className="flex">
            <ul>
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
</form>;
