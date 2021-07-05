import {
    CREARTAREA,
    OBTENERTAREAS,
    ACTUALIZARTAREA,
    ELIMINARTAREA, 
  } from "../actions/types";
  
  const initialState = [];
  
  function tareaReducer(tareas = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREARTAREA:
        return [...tareas, payload];
  
      case OBTENERTAREAS:
        return payload;
  
      case ACTUALIZARTAREA:
        return tareas.map((tarea) => {
          if (tarea.id === tarea.id) {
            return {
              ...tarea,
              ...payload,
            };
          } else {
            return tarea;
          }
        });
  
      case ELIMINARTAREA:
        return tareas.filter(({ id }) => id !== payload.id);
  
      default:
        return tareas;
    }
  };
  
  export default tareaReducer;