import { BASE } from "env";
import {
    setStatusUpdate,
    starLoadingUpdateNotificaciones,
} from "./updateNotificacionesSlice";

import {

    starLoadingDeleteNotificaciones,
} from "./deleteNotificacionesSlice";

import Cookies from "js-cookie";

export const updateNotificaciones = (id, estado, valores) => {

    return async (dispatch) => {

        // console.log("UPDATE NOTIFICACIONES");
        // console.log("id: ", id);
        // console.log("estado: ", estado);
        // console.log("valores", valores);


        //const urlBase = 'https://portal2-des.iplan.com.ar/'; // DESA
        const urlBase = `${BASE}`; // PROD
        // const urlBase = 'https://www.iplan.com.ar/'; // PROD
        // const urlBase = 'https://portal-desa-cloud.iplan.com.ar/'; // nuevo server
        // const urlBase = 'https://portal-prod-cloud.iplan.com.ar/'; // nuevo server


        const myHeader = {
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
        }

        let myBody;
        let url;

        if (estado) {

            dispatch(starLoadingDeleteNotificaciones(true));
            myBody = JSON.stringify({
                id: id
            });

            url = `${urlBase}webService/notificaciones/notifications/status.php`;

        } else {

            dispatch(starLoadingUpdateNotificaciones(true));
            myBody = JSON.stringify({
                id: id,
                titulo: valores.titulo,
                mensaje: valores.contenidoComunicacion
            });

            url = `${urlBase}webService/notificaciones/notifications/update.php`;
        }

        const requestConfig = {
            method: "PUT",
            headers: myHeader,
            body: myBody,
            credentials: 'include',
        }

        try {

            const response = await fetch(url, requestConfig);
            const respuesta = await response.json();
            //console.log(respuesta);


            // // fallo
            // // const respuesta = {
            // //     "success": false,
            // //     "message": "Errores de validación",
            // //     "timestamp": "2025-07-16 17:34:07",
            // //     "details": {
            // //         "titulo": "Título no puede exceder 45 caracteres"
            // //     }
            // // }

            //exito
            // const respuesta =
            // {
            //     "success": true,
            //     "message": "Notificación actualizada exitosamente",
            //     "timestamp": "2025-07-16 17:35:39",
            //     "data": {
            //         "id": "216",
            //         "updated_fields": [
            //             "titulo",
            //             "mensaje"
            //         ],
            //         "status": "updated",
            //         "notification": {
            //             "id": 216,
            //             "titulo": "TESTEO func CREACIÓN CON PUSH",
            //             "mensaje": "<p><strong>Prueba de funcionamiento creacion con push<\/strong><\/p>",
            //             "estado": "activo",
            //             "ultimo_usuario_ldap": "CONSULTORA_ezense",
            //             "ultima_actualizacion": "2025-07-16 17:45:35"
            //         }
            //     }
            // }


            // console.log('🕐 Iniciando envío... (5 segundos)');

            // // ⏰ SIMULAR DEMORA DE 5 SEGUNDOS
            // await new Promise(resolve => setTimeout(resolve, 5000));

            // console.log('✅ Simulación completada después de 5 segundos');




            dispatch(starLoadingUpdateNotificaciones(false));

            dispatch(starLoadingDeleteNotificaciones(false));



            //return {"Respuesta":"ERROR", "data":null}
            //return {"Respuesta":"OK", "data": respuesta}




            if (!response.ok) {
                console.log("FALLO");
                return { "Respuesta": "ERROR", "data": null }
            }

            console.log("EXITO");
            return { "Respuesta": "OK", "data": respuesta }



        } catch (error) {
            console.log("FALLO");
            if (error.response.data.error_type == "session_expired") {
                Cookies.remove('token');
                window.location.href = '/comunicaciones/#/error';
            } else {
                return { "Respuesta": "ERROR", "data": null }
            }
        }

    }


}