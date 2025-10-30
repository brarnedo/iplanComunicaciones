import { useSelector } from 'react-redux';

export const getArchivadas = () => {

    return async (dispatch, getState) => {

        //const urlBase = 'https://portal2-des.iplan.com.ar/'; // DESA
        // const urlBase = 'https://www.iplan.com.ar/'; // PROD
        const urlBase = 'https://portal-desa-cloud.iplan.com.ar/'; // PROD

        try {

            const { session } = getState().auth;
            console.log(session)

            const myBody = JSON.stringify({
                "session": session
            })

            const configRequest = {
                method: "POST",
                body: myBody
            }

            const response = await fetch(`${urlBase}comunicaciones/notificaciones_new/api/notifications/get.php?type=programadas`, configRequest);
            const respuesta = await response.json();

            console.log(respuesta);


        } catch (error) {
            if (error.response.data.error_type == "session_expired") {
                Cookies.remove('token');
                window.location.href = '/comunicaciones/#/error';
            } else {
                console.log(error);
                return { status: "ERROR", data: null }
            }
        }

    }

}