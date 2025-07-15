


export const getArchivadas = () => {

    return async (dispatch, getState) => {

        try {

            const configRequest = {
                method:"GET"
            }

            const response = await fetch ("https://portal2-des.iplan.com.ar/comunicaciones/notificaciones_new/api/notifications/get.php?type=programadas", configRequest);
            const respuesta = await response.json();

            console.log(respuesta);

            
        } catch (error) {
            console.log(error);
            return {status:"ERROR", data:null}
        }

    }

}