import { SHOWALERTA, HIDEALERTA } from '../actions/types';
import React, {useReducer} from 'react';
import alertaErrorContext from './alertaError';
import alertaErrorReducer from './alertaErrorReducer';

//Estado
const AlertaErrorState = props => {
   const initialState = {
       alerta:null
   }

   const [state, dispatch] = useReducer(
       alertaErrorReducer,initialState
   );

   const showAlerta = (mensaje,tarea) => {
       dispatch({
           type:SHOWALERTA,
           payload:{
               mensaje,
               tarea
           }
       });

       setTimeout(() => {
           dispatch({
               type:HIDEALERTA
           })
       }, 5000);
   }

    return(
        <alertaErrorContext.Provider
          value={{
              alerta:state.alerta,
              showAlerta
          }}
        >
            {props.children}
        </alertaErrorContext.Provider>
    )
}

export default AlertaErrorState;