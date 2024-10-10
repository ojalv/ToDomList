class Tarea {
  constructor(
    nombre = "",
    descripcion = "",
    completa = false,
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.completa = completa;
    this.id = `${Date.now().toString(36)}_${this.nombre.replace(" ", "_").toLowerCase()}`
  }
}


export {Tarea}
