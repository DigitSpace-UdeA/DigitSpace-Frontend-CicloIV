import React from "react";

const RegistrarAvance = () => {
    return <div className="">
        <h1 class="m-5 font-bold text-4xl" >Registro de Avances</h1>
        <div className="p-1 m-20 bg-gray-200 rounded-lg shadow-lg">
            <label className=" m-5 flex font-bold rounded-lg">
                Proyecto</label>
            <label className="m-5 flex font-bold  flex rounded-lg">
                Fecha</label>
            <label className="m-5 flex font-bold hover:shadow-lg flex rounded-lg">
                Descripción</label>
            <label className="m-5 flex font-bold hover:shadow-lg flex rounded-lg">
                Observaciones del lider</label>
        </div>
    </div>;
};

export default RegistrarAvance;