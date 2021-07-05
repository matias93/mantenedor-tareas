import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerTareas,
} from "../actions/creators";
// css
import './estilo-componentes.css';

const  ListaTareas = () => {
  const [tareaActual, settareaActual] = useState(null);
  const [actualIndex, setActualIndex] = useState(-1);
 
 const tareas = useSelector(state => state.tareas);
  console.log('====>tareas,',tareas)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerTareas());
  }, []);

  const setActiveTarea = (tarea, index) => {
    settareaActual(tarea);
    setActualIndex(index);
  };

  return (
    <div className="list row">
    <div className="col-md-6">
        <h4 className="titulo">Mantenedor de Tareas</h4>

        <ul className="list-group">
          {tareas &&
            tareas.map((tarea, index) => (
              <div
                className={
                  "list-group-item " + (index === actualIndex ? "active" : "")
                }
                onClick={() => setActiveTarea(tarea, index)}
                key={index}
              >
              <h4>{tarea.titulo}</h4>
              <p>{tarea.descripcion}</p>
              <p>{tarea.usuario}</p>
              </div>
            ))}
        </ul>

      </div>

      <div className="col-md-6">
        {tareaActual ? (
          <div className="card">
            <div className="card-body">
            <h4>Tarea Seleccionada</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {tareaActual.titulo}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {tareaActual.descripcion}
            </div>
            <div>
              <label>
                <strong>Usuario:</strong>
              </label>{" "}
              {tareaActual.usuario}
            </div>
            <div>
              <label>
                <strong>Estado:</strong>
              </label>{" "}
              {tareaActual.published ? "Published" : "Pending"}
           </div>
          </div> 

          <span class="badge bg-primary detalles">
            <Link
              to={"/tareas/" + tareaActual.id}
              className="badge badge-warning"
            >
             Editar Tarea
            </Link>
          </span>
          </div>
        ) : (
          <div>
            <br />
            <p>Vea el detalle de la Tarea</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default  ListaTareas;