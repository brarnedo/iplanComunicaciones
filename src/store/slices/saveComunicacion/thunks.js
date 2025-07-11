import { setLoadingSaveComunicacion, setSaveComunicacion } from "./saveComunicacionSlice";

export const getSaveComunicacion = (formDataComunicacion) => {
    return async (dispatch, getState) => {
        dispatch(setLoadingSaveComunicacion(true))
      
        // DEBUG
		console.log('=== FORMDATA COMPLETO ===');
		for (let [key, value] of formDataComunicacion) {
			console.log(key, ':', value);
		}

        const configRequest = {
            method: 'POST',
            body: formDataComunicacion  
        }

        try{

            console.log('🕐 Iniciando envío... (5 segundos)');
            
            // ⏰ SIMULAR DEMORA DE 5 SEGUNDOS
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            console.log('✅ Simulación completada después de 5 segundos');
             
            //const response =  await fetch ('https://portal2-des.iplan.com.ar/comunicaciones/notificaciones_new/api/notifications/create.php', configRequest);
            //const respuesta = await response.json();

            const respuesta = {
                                    "success": true,
                                    "message": "Notificación creada exitosamente",
                                    "data": {
                                        "id": 123,
                                        "type": "general",
                                        "status": "created"
                                    },
                                    "status": 201
                                }

            dispatch(setSaveComunicacion(respuesta));
            dispatch(setLoadingSaveComunicacion(false));
           
            if(respuesta.success){
                return {status: "OK", data: respuesta}
            }else{
                return {status: "ERROR", data: null}
            }

        }
        catch(error){
            console.log(error);            
            dispatch(setLoadingSaveComunicacion(false))

            return {status:"ERROR", data:null}
        }

    }

}