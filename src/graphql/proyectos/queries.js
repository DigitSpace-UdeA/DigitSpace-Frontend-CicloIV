import { gql } from '@apollo/client';

const PROYECTOS = gql`
query Proyectos {
  Proyectos {
    _id
    nombre
    presupuesto
    fechaInicial
    fechaFinal
    estadoProyecto
    faseProyecto
    lider {
      _id
      nombre
      correo
      apellido
    }
    objetivos {
      _id
      descripcion
      tipo
    }

  }
}
`;

const GET_AVANCE = gql`
query FiltrarAvance($_id: String!) {
  filtrarAvance(_id: $_id) {
    fechaAvance
    descripcion
    observaciones
    proyecto {
      nombre
    }
    creadoPor {
      nombre
    }
  }
}
`;

export { PROYECTOS, GET_AVANCE };
