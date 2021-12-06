import { gql } from "@apollo/client";

const GET_PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      presupuesto
      fechaInicial
      fechaFinal
      faseProyecto
      estadoProyecto
    }
  }
`;

const GET_PROYECTO = gql`
  query Proyecto($_id: String!) {
    Proyecto(_id: $_id) {
      _id
      nombre
      presupuesto
      fechaInicial
      fechaFinal
      faseProyecto
      estadoProyecto
    }
  }
`;
export { GET_PROYECTOS, GET_PROYECTO };
