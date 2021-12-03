import React from "react";
import { useParams, Link } from "react-router";
const EditarProyecto = () => {
  const { _id } = useParams();
  return <div>editar proyecto {_id}</div>;
};

export default EditarProyecto;
