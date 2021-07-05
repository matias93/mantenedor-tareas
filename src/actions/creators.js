//Servicio
import ServicioTarea from "../service/servicioTarea";
// Types
import {
CREARTAREA,
OBTENERTAREAS,
ACTUALIZARTAREA,
ELIMINARTAREA, 
} from "./types";

export const obtenerTareas = () => async (dispatch) => {
  try {
    const res = await ServicioTarea.traerTareas();
    console.log('lista tareas =======>',res)

    dispatch({
      type: OBTENERTAREAS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
  
export const crearTask = (titulo, descripcion, usuario) => async (dispatch) => {
  try {
    const res = await ServicioTarea.crearTarea({ titulo, descripcion, usuario});
    dispatch({
      type: CREARTAREA,
      payload: res.data,
    });
    return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const actualizarTask = (id, data) => async (dispatch) => {
    try {
      const res = await ServicioTarea.actualizarTarea(id, data);
      dispatch({
        type: ACTUALIZARTAREA,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const eliminarTask = (id) => async (dispatch) => {
    try {
      await ServicioTarea.eliminarTarea(id);
  
      dispatch({
        type: ELIMINARTAREA,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  