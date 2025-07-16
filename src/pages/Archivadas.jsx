import { Notificacion } from 'components'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getNotificaciones } from 'store';
import {useSelector} from 'react-redux';
import { Loader } from 'componentesUI';
import { useState } from 'react';



export const Archivadas = () => {
    const dispatch = useDispatch();
    const { notificaciones, isLoadingNotificaciones } = useSelector((state) => state.notificaciones);
    
    const [paginaActual, setPaginaActual] = useState(1);
    let ITEMS_POR_PAGINA = 5;
    const indiceUltimo = paginaActual * ITEMS_POR_PAGINA;
    const indicePrimero = indiceUltimo - ITEMS_POR_PAGINA;
    const notificacionesPagina = notificaciones.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(notificaciones.length / ITEMS_POR_PAGINA);

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
                    notificacionesPagina.map((notificacion, index) => (
                        <Notificacion
                            index={index + 1}
                            tipo={notificacion.titulo_interno}
                            fechaIni={notificacion.Desde}
                            fechaFin={notificacion.Hasta}
                            nombre={notificacion.creador_usuario_ldap}
                            titulo={notificacion.Titulo}
                            img={notificacion.archivos ? notificacion.archivos.imagen : ''}
                            msj={notificacion.mensaje_personalizado}
                            lista1={notificacion.archivos ? notificacion.archivos.csv_clientes : ''}
                            lista2={notificacion.archivos ? notificacion.archivos.csv_precios : ''}
                            key={indicePrimero + index} />
                    ))
                }
            </section>

             {/* Paginador */}
            <div className="flex gap-2 justify-center mt-4">
                <button
                    onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                    disabled={paginaActual === 1}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 texto_16_500 text-subtitle"
                >
                    Anterior
                </button>
                {
                    Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPaginaActual(i + 1)}
                            className={`texto_16_500 px-3 py-1 rounded ${paginaActual === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))
                }
                <button
                    onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                    disabled={paginaActual === totalPaginas}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 texto_16_500 text-subtitle"
                >
                    Siguiente
                </button>
            </div>
		</div>
        
	);
};
