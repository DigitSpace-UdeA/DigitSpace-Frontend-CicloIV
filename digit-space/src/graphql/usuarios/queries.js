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
export { GET_PROYECTOS };
