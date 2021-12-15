
    const AccordionProyecto = ({ proyecto }) => {
      var id = proyecto._id;
      var gg = id;
      return (
        <Accordion>
          <AccordionSummary expandIcon={<i class="fas fa-chevron-down"></i>}>
            <div>
              <div>
                {proyecto.nombre} - {proyecto.estadoProyecto} -
                {proyecto.faseProyecto} - {proyecto._id}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col w-full justify-between">
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
                  <Link to={`/main/proyectos/inscribirse/${id}`} className="">
                    <i
                      class="fas fa-sign-in-alt text-gray-600 hover:text-gray-400 cursor-pointer"
                      title="Inscribirse"
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
                  <h1 className="font-bold text-blue-400">{id}</h1>
                </div>
              </div>
            </div>
            <div>
              <Dialog
                open={showDialog}
                onClose={() => {
                  setShowDialog(false);
                }}
              >
                <div className="p-3">
                  <div>
                    <h1 className="font-bold text-blue-400">
                      Editar Fase y estado del proyecto
                    </h1>
                    <h1 className="font-bold text-blue-400">{id}</h1>
                    <EditAdministrador ide={gg} />
                  </div>
                </div>
              </Dialog>
            </div>
          </AccordionDetails>
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
    const EditAdministrador = ({ ide }) => {
      const { form, formData, updateFormData } = useFormData();
      const [
        editarProyectoAdministrador,
        { data: dataMutation, loading, error },
      ] = useMutation(EDITAR_PROYECTOADMINISTRADOR);

      const submitForm = (e) => {
        e.preventDefault();
        editarProyectoAdministrador({
          variables: { ide, campos: formData },
        });
      };

      useEffect(() => {
        console.log("id", ide);
      }, ide);

      useEffect(() => {
        console.log("veamos", dataMutation);
      }, [dataMutation]);

      return (
        <div>
          <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
            <Input
              label="Identificacion proyecto"
              type="text"
              name="_id"
              defaultValue={ide}
              required={true}
              readonly="readonly"
            />
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
