import  _http from "../Environment/Env";

// Request Api

const traerTareas = () => {
  return _http.get("/tareas");
};
  
const traerTarea = id => {
  return _http.get(`/tareas/${id}`);
};
  
const crearTarea = data => {
  return _http.post("/tareas", data);
};
  
const actualizarTarea = (id, data) => {
  return _http.put(`/tareas/${id}`, data);
};
  
const eliminarTarea = id => {
  return _http.delete(`/tareas/${id}`);
};
  
const ServicioTarea = {
  traerTareas,
  traerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
  
export default ServicioTarea;