import { gql } from "@apollo/client";

const EDITAR_OBJETIVO = gql`
  mutation Mutation(
    $idProyecto: String!
    $indexObjetivo: Int!
    $campos: camposObjetivo!
  ) {
    editarObjetivo(
      idProyecto: $idProyecto
      indexObjetivo: $indexObjetivo
      campos: $campos
    ) {
      objetivos {
        descripcion
        tipo
      }
    }
  }
`;

const EDITAR_PROYECTO = gql`
  mutation Mutation($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      _id
      estadoProyecto
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

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;

export {
  EDITAR_PROYECTO,
  CREAR_PROYECTO,
  EDITAR_PROYECTOADMINISTRADOR,
  EDITAR_OBJETIVO,
};

// const CREAR_PROYECTO = gql`
//   mutation CrearProyecto(
//     $nombre: String!
//     $presupuesto: Float!
//     $fechaInicial: Date!
//     $fechaFinal: Date!
//     $lider: String!
//     $objetivos: [crearObjetivo]
//   ) {
//     crearProyecto(
//       nombre: $nombre
//       presupuesto: $presupuesto
//       fechaInicial: $fechaInicio
//       fechaFinal: $fechaFin
//       lider: $lider
//       objetivos: $objetivos
//     ) {
//       _id
//     }
//   }
// `;
