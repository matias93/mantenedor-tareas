import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actualizarTask, eliminarTask } from "../actions/creators";
import ServicioTarea from "../service/servicioTarea";
// css
import './estilo-componentes.css';

const Tarea = (props) => {
  const stateTarea = {
    id: null,
    titulo: "",
    descripcion: "",
    usuario:"",
    estado: false
  };
  const [tareaActual, setTareaActual] = useState(stateTarea);
  const [mensaje, setMensaje] = useState("");

  const dispatch = useDispatch();

  const obtenerTask = id => {
    ServicioTarea.traerTarea(id)
      .then(response => {
        setTareaActual(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    obtenerTask(props.match.params.id);
  }, [props.match.params.id]);

  const leerInputs = e => {
    const { name, value } = e.target;
    setTareaActual({ ...tareaActual, [name]: value });
  };

  const actualizarEstado = status => {
    const data = {
      id: tareaActual.id,
      titulo: tareaActual.titulo,
      descripcion: tareaActual.descripcion,
      usuario: tareaActual.usuario,
      estado: status
    };

    dispatch(actualizarTask(tareaActual.id, data))
      .then(response => {
        console.log(response);
        setTareaActual({ ...tareaActual, estado: status });
        setMensaje("El Mstado a sido Actualizado!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(actualizarTask(tareaActual.id, tareaActual))
      .then(response => {
        console.log(response);
        setMensaje("La Tarea a sido Actualizada!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const eliminarTaks = () => {
    dispatch(eliminarTask(tareaActual.id))
      .then(() => {
        setMensaje("La Tarea a sido Eliminada!");
        props.history.push("/tareas");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
    {tareaActual ? (
      <div className="editar-form">
        <h4>Editar Tarea</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Titulo:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={tareaActual.titulo}
              onChange={leerInputs}
              placeholder="Ingrese Titulo(*)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={tareaActual.descripcion}
              onChange={leerInputs}
              placeholder="Ingrese Descripcion(*)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Usuario">Usuario:</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              name="usuario"
              value={tareaActual.usuario}
              onChange={leerInputs}
              placeholder="Ingrese Nombre Usuario(*)"
            />
          </div>

          <div className="form-group">
            <label>
              <strong>Status:</strong>
            </label>
            {tareaActual.published ? "Estado" : "Ingresado"}
          </div>
        </form>

        {tareaActual.published ? (
          <button
            className="btn btn-danger mr-2"
            onClick={() => actualizarEstado(false)}
          >
            No Publicado
          </button>
        ) : (
          <button
            className="btn btn-danger mr-2"
            onClick={() => actualizarEstado(true)}
          >
            Publicado
          </button>
        )}

        <button className="btn btn-danger mr-2" onClick={eliminarTaks}>
          Eliminar Tarea
        </button>

        <button
          type="submit"
          className="btn btn-danger"
          onClick={updateContent}
        >
          Actualizar
        </button>
        <p className="mensaje">{mensaje}</p></div>
    ) : (
      <div>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    )}
  </div>
  );
};

export default Tarea;