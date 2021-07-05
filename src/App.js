import React from "react";
import { 
BrowserRouter as Router, 
Switch, 
Route, 
Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

//Componentes
import CrearTarea from "./components/CrearTarea";
import Tarea from "./components/Tarea";
import ListaTareas from "./components/ListaTareas"
import AlertaErrorState from "./alertaError/AlertaState";

function App() {
  return (
    <div className="App">
    <AlertaErrorState>
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a href="/tareas" className="navbar-brand">
         Modulo Tareas
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tareas"} className="nav-link">
              Tareas
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/crear"} className="nav-link">
             Agregar
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tareas"]} component={ListaTareas} />
          <Route exact path="/crear" component={CrearTarea} />
          <Route path="/tareas/:id" component={Tarea} />
        </Switch>
      </div>
    </Router>
    </AlertaErrorState>
    </div>
  );
}

export default App;
