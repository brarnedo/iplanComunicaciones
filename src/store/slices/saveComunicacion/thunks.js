import axios from "axios";
import Cookies from "js-cookie";
import { BASE, CREAR } from "env";
import { setLoadingSaveComunicacion, setSaveComunicacion } from "./saveComunicacionSlice";

export const getSaveComunicacion = (formDataComunicacion) => {
    // console.log("👀 - getSaveComunicacion - formDataComunicacion:", formDataComunicacion);
    return async (dispatch, getState) => {
        dispatch(setLoadingSaveComunicacion(true))
        
        // DEBUG
		for (let [key, value] of formDataComunicacion) {
		}

        let config = {
            method: "post",
            url: `${BASE}${CREAR}`,
            data: formDataComunicacion,
            headers: { 
                'Authorization': `Bearer ${Cookies.get('token')}`, 
            },
            withCredentials: true,
        };

        try{
            const response = await axios.request(config);
            if (response.status == 200 || response.status == 201) {

                dispatch(setSaveComunicacion(response.data));
                dispatch(setLoadingSaveComunicacion(false));
                if(response.data.success){
                    return {status: "OK", data: response.data}
                }else{
                    return {status: "ERROR", data: null}
                }
            }
           
        }
        catch(error){
            console.log(error);            
            if(error.response.data.error_type == "session_expired"){
                Cookies.remove('token');
                window.location.href = '/comunicaciones/#/error';
            }else{
                dispatch(setLoadingSaveComunicacion(false))
                return {status:"ERROR", data:null}
            }
        }

    }

}