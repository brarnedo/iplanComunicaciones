import { Notificacion } from 'components'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getNotificaciones } from 'store';
import {useSelector} from 'react-redux';
import { Loader } from 'componentesUI';

export const Archivadas = () => {
    const { notificaciones, isLoadingNotificaciones } = useSelector((state) => state.notificaciones);
    console.log("👀 - :10 - Archivadas - notificaciones:", notificaciones);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotificaciones('archivadas'))
    }, []);

    if(isLoadingNotificaciones) return <div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
        <div className="flex items-center justify-center"><Loader color="#FF006E"/></div>
    </div>

	return (<div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
            
			<div className='border-b-[1px] border-secondary'>
				<p className='text-secondary texto_18_800'>Archivo de comunicaciones</p>
			</div>
            
            <section className="flex flex-col w-full text-bg_secondary">
                {
                    notificaciones.map((notificacion, index) => (
                        <Notificacion tipo={notificacion.titulo_interno} fechaIni={notificacion.Desde} fechaFin={notificacion.Hasta} nombre={notificacion.creador_usuario_ldap} titulo={notificacion.Titulo} img={notificacion.archivos ? notificacion.archivos.imagen : ''} msj={notificacion.mensaje_personalizado} lista1={notificacion.archivos ? notificacion.archivos.csv_clientes : ''} lista2={notificacion.archivos ? notificacion.archivos.csv_precios : ''} key={index} />
                    ))
                }
            </section>
		</div>
	);
};
