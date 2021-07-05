import { SHOWALERTA, HIDEALERTA } from "../actions/types";

export default (state,action) => {
    switch (action.type) {
        case SHOWALERTA:
            return {
                alerta:action.payload
            }
        case HIDEALERTA:
            return{
                alerta:null
            }
        default:
            return state;
    }
}