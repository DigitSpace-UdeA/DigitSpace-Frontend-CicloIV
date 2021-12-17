import { gql } from "@apollo/client";

const GET_INSCRIPCIONES = gql`
  query Inscripciones {
    Inscripciones {
      _id
      estadoInscripcion
      estudiante {
        _id
        nombre
        apellido
        correo
      }
      proyecto {
        _id
        nombre
        lider {
          _id
        }
      }
    }
  }
`;

export { GET_INSCRIPCIONES };
