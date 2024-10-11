import { Tarea } from "./utils/classes.js";
let listaDeTareas;
if (!localStorage.getItem("tareas")) {
  listaDeTareas = [
    new Tarea("Tarea 1", "Presiona un titulo y cambia su texto"),
    new Tarea("Tarea 2", "Presiona una descripcion y tambien cambiala"),
    new Tarea(
      "Tarea 3",
      "Marca las casillas para indicar que las tareas estan completas"
    ),
    new Tarea("Tarea 4", "Eliminar las tareas que completaste"),
  ];
  localStorage.setItem("tareas", JSON.stringify(listaDeTareas));
} else {
  listaDeTareas = JSON.parse(localStorage.getItem("tareas"));
}

function app(listaDeTareas) {
  function cargarTareas(listaDeTareas) {
    const contenedor = document.createElement("div");
    contenedor.id = "contenedor-tareas";
    function titulo() {
      const hTitulo = document.createElement("h2");
      hTitulo.textContent = "Tareas";
      return hTitulo;
    }
    function crearTarea(t) {
      const { nombre, descripcion, id } = t;
      const card = document.createElement("div");
      card.id = id;
      card.classList.add("cardTarea");
      const hNombre = document.createElement("h3");
      hNombre.textContent = nombre;
      hNombre.addEventListener("click", () => {
        const nuevoNombre = prompt("Nuevo Nombre");
        if (nuevoNombre) {
          hNombre.textContent = nuevoNombre;
          t.descripcion = nuevoNombre;
        }
      });
      const hDescripcion = document.createElement("p");
      hDescripcion.textContent = descripcion;
      hDescripcion.addEventListener("click", () => {
        const nuevaDescripcion = prompt("Editar descripcion");
        if (nuevaDescripcion) {
          hDescripcion.textContent = nuevaDescripcion;
          t.descripcion = nuevaDescripcion;
        }
      });
      const hCompleta = document.createElement("img");
      if (t.completa) {
        card.classList.add("tareaCompleta");
        hCompleta.setAttribute("src", "./assets/svg/double_check_green.svg");
      } else {
        card.classList.remove("tareaCompleta");
        hCompleta.setAttribute("src", "./assets/svg/double_check_grey.svg");
      }
      hCompleta.addEventListener("click", () => {
        if (t.completa) {
          hCompleta.setAttribute("src", "./assets/svg/double_check_grey.svg");
          t.completa = false;
          card.classList.remove("tareaCompleta");
        } else {
          hCompleta.setAttribute("src", "./assets/svg/double_check_green.svg");
          t.completa = true;
          card.classList.add("tareaCompleta");
        }
        localStorage.setItem("tareas", JSON.stringify(listaDeTareas));
      });
      hCompleta.addEventListener("pointerenter", () => {
        if (t.completa) {
          hCompleta.setAttribute("src", "./assets/svg/double_check_grey.svg");
        } else {
          hCompleta.setAttribute("src", "./assets/svg/double_check_green.svg");
        }
      });
      hCompleta.addEventListener("pointerleave", () => {
        if (t.completa) {
          hCompleta.setAttribute("src", "./assets/svg/double_check_green.svg");
        } else {
          hCompleta.setAttribute("src", "./assets/svg/double_check_grey.svg");
        }
      });

      const hBorrar = document.createElement("img");
      hBorrar.setAttribute("src", "./assets/svg/delete_black.svg");
      hBorrar.classList.add("eliminar_tarea");
      hBorrar.addEventListener("click", () => {
        card.remove();
        const idx = listaDeTareas.findIndex((ti) => ti.id == t.id);
        if (idx != -1) {
          listaDeTareas.splice(idx, 1);
          console.log("Se elimino:", t.nombre);
          localStorage.setItem("tareas", JSON.stringify(listaDeTareas));
        }
      });
      hBorrar.addEventListener("pointerenter", () => {
        hBorrar.setAttribute("src", "./assets/svg/delete_red.svg");
      });
      hBorrar.addEventListener("pointerleave", () => {
        hBorrar.setAttribute("src", "./assets/svg/delete_black.svg");
      });
      card.appendChild(hNombre);
      card.appendChild(hDescripcion);
      card.appendChild(hCompleta);
      card.appendChild(hBorrar);
      return card;
    }
    contenedor.appendChild(titulo());
    for (let i = listaDeTareas.length - 1; i >= 0; i--) {
      contenedor.appendChild(crearTarea(listaDeTareas[i]));
    }
    document.getElementById("app").appendChild(contenedor);
  }
  function bienvenida() {
    const hContenedor = document.createElement("div");
    const hTitulo = document.createElement("h1");
    hTitulo.textContent = "Bienvenido a ToDOM List";
    const hParrafo = document.createElement("p");
    hParrafo.textContent =
      "La lista de tareas que solo usa manipulacion del DOM";
    hContenedor.appendChild(hTitulo);
    hContenedor.appendChild(hParrafo);
    document.getElementById("app").appendChild(hContenedor);
  }
  function crearTarea(listaDeTareas, cargarTareas) {
    const hContenedor = document.createElement("form");
    hContenedor.addEventListener("submit", (e) => {
      e.preventDefault();
      if (inpNombreTarea.value) {
        listaDeTareas.push(
          new Tarea(inpNombreTarea.value, inpDescripcionTarea.value)
        );
        localStorage.setItem("tareas", JSON.stringify(listaDeTareas));
        document.getElementById("contenedor-tareas").remove();
        cargarTareas(listaDeTareas);
        inpNombreTarea.value = "";
        inpDescripcionTarea.value = "";
      }
    });
    const hTitulo = document.createElement("h2");
    hTitulo.textContent = "Crea Una Tarea";
    const pNombreTarea = document.createElement("p");
    pNombreTarea.textContent = "Titulo:";
    const inpNombreTarea = document.createElement("input");
    const pDescripcionTarea = document.createElement("p");
    pDescripcionTarea.textContent = "Descripcion:";
    const inpDescripcionTarea = document.createElement("input");
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Agregar";
    hContenedor.appendChild(hTitulo);
    hContenedor.appendChild(pNombreTarea);
    hContenedor.appendChild(inpNombreTarea);
    hContenedor.appendChild(pDescripcionTarea);
    hContenedor.appendChild(inpDescripcionTarea);
    hContenedor.appendChild(submit);
    document.getElementById("app").appendChild(hContenedor);
  }
  function contenedorApp() {
    const app = document.createElement("div");
    app.id = "app";
    document.body.appendChild(app);
  }
  contenedorApp();
  bienvenida();
  crearTarea(listaDeTareas, cargarTareas);
  cargarTareas(listaDeTareas);
}

window.onload = app(listaDeTareas);
