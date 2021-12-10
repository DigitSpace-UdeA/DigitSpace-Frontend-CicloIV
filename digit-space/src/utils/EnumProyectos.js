const Enum_Rol = {
  ADMINISTRADOR: "Administrador",
  ESTUDIANTE: "Estudiante",
  LIDER: "Líder",
};

const Enum_Estado_Usuarios = {
  PENDIENTE: "Pendiente",
  AUTORIZADO: "Autorizado",
  NO_AUTORIZADO: "No autorizado",
};

const Enum_EstadoProyecto = {
  ACTIVO: "Activo",
  INACTIVO: "Inactivo",
};

const Enum_FaseProyecto = {
  INICIADO: "Iniciado",
  EN_DESARROLLO: "En Desarrollo",
  TERMINADO: "Terminado",
  NULO: "Nulo",
};

export {
  Enum_EstadoProyecto,
  Enum_FaseProyecto,
  Enum_Estado_Usuarios,
  Enum_Rol,
};
