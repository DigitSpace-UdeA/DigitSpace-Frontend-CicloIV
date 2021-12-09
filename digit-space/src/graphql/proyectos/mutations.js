import { gql } from "@apollo/client";

const EDITAR_PROYECTOLIDER = gql`
  mutation EditarProyecto($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      _id
      nombre
      presupuesto
    }
  }
`;
const EDITAR_PROYECTOADMINISTRADOR = gql`
  mutation Mutation($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      _id
      nombre
      estadoProyecto
      faseProyecto
    }
  }
`;

export { EDITAR_PROYECTOLIDER, EDITAR_PROYECTOADMINISTRADOR };
