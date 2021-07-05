import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { crearTask } from "../actions/creators";
import AlertaErrorContext from "../alertaError/alertaError";
// css
import './estilo-componentes.css';

const CrearTarea= () => {
  // Estado incial
  const tareaState = {
    id: null,
    titulo: "",
    descripcion: "",
    usuario:"",
    estado: false,
  };

  const [tarea, setTarea] = useState(tareaState);
  const [enviar, setEnviar] = useState(false);

  const alertaContext = useContext(AlertaErrorContext);
  const { alerta, showAlerta} = alertaContext;

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTarea({ ...tarea, [name]: value });
  };
  
  const enviarTarea = (e) => {
    e.preventDefault();
    const { titulo, descripcion, usuario } = tarea;
    if (
    titulo.trim() === "" ||
    descripcion.trim() === "" ||
    usuario.trim() === ""
     ) {
      showAlerta('Debe Completar todos los Campos');
      return
    }
    else {
      dispatch(crearTask(titulo, descripcion, usuario))
      .then(data => {
        setTarea({
          id: data.id,
          titulo: data.titulo,
          descripcion: data.descripcion,
          usuario: data.usuario,
        });
        setEnviar(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  const nuevaTarea = () => {
    setTarea(tareaState);
    setEnviar(false);
  };

  return (
    <div className="enviar-form">
      <h4 className="py-4">Crear Tarea</h4>
      {enviar ? (
        <div>
          <h5>Tarea Ingresada Exitosamente!</h5>
          <div className="d-grid gap-2">
          <button className="btn btn-success" onClick={nuevaTarea}>
            Agregar
          </button>
          </div>
        </div>
      ) : (

      <div>
        <form onSubmit={enviarTarea}>
        {alerta ? (<span className="error">{alerta.mensaje}</span>) : null}
          <div className="form-group">
            <label htmlFor="titulo">Titulo:</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={tarea.titulo}
              onChange={handleInputChange}
              name="titulo"
              placeholder="Ingrese Titulo(*)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripcion:</label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              onChange={handleInputChange}
              name="descripcion"
              value={tarea.descripcion}
              placeholder="Ingrese Descripción(*)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              value={tarea.usuario ? tarea.usuario : ""}
              onChange={handleInputChange}
              name="usuario"
              placeholder="Ingrese Nombre de Usuario(*)"
            />
         </div>
          
          <div class="d-grid gap-2">
            <button type="submit" className="btn btn-success btn-lg btn-block">
              Crear
            </button>
          </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CrearTarea;