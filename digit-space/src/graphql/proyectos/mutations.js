import { gql } from "@apollo/client";

const EDITAR_PROYECTOLIDER = gql`
  mutation Mutation($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      _id
      estadoProyecto
    }
  }
`;
const EDITAR_PROYECTOADMINISTRADOR = gql`
  mutation Mutation($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      estadoProyecto
      faseProyecto
    }
  }
`;

export { EDITAR_PROYECTOLIDER, EDITAR_PROYECTOADMINISTRADOR };
