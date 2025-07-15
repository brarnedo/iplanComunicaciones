import axios from "axios";
import { BASE, ARCHIVADAS } from "env";
import {
  setNotificacionesArchivadas,
  starLoadingNotificacionesArchivadas,
} from "./archivadasSlice";
import Cookies from "js-cookie";

export const getNotificacionesArchivadas = () => {
  return async (dispatch) => {
    dispatch(starLoadingNotificacionesArchivadas(true));
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE}${ARCHIVADAS}`,
        headers: { 
            'Authorization': `Bearer ${Cookies.get('token')}`, 
            'Cookie': 'PHPSESSID=59vv7otaq2vsqr2s786tm5ohqj; dev-postman=U1VQRVJfQk9SR1VFTExP'
        },
      withCredentials: true,
    };
 

    try {
      const response = await axios.request(config);
      console.log("👀 - :30 - return - response:", response);

      if (response.status == 200) {
        dispatch(starLoadingNotificacionesArchivadas(false));
        dispatch(setNotificacionesArchivadas({ notificacionesArchivadas: response.data.data }));
        return "OK";
      }
    } catch (error) {
      console.log("👀 - return - error:", error);
      dispatch(starLoadingNotificacionesArchivadas(false));
    }
  };
};