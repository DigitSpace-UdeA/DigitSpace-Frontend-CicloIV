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
      objetivos {
        descripcion
        tipo
      }
      lider {
        nombre
        identificacion
      }
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
      estadoProyecto
      faseProyecto
      objetivos {
        descripcion
        tipo
      }
      lider {
        nombre
        identificacion
      }
    }
  }
`;

const GET_AVANCE = gql`
  query Avances($_id: String!) {
    Avance(_id: $_id) {
      _id
      descripcion
      fechaAvance
      observaciones
    }
  }
`;

export { GET_PROYECTOS, GET_PROYECTO, GET_AVANCE };
