import { Notificacion } from 'components'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getNotificaciones } from 'store';
import {useSelector} from 'react-redux';
import { Loader } from 'componentesUI';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export const Archivadas = () => {
    const dispatch = useDispatch();
    const { notificaciones, isLoadingNotificaciones } = useSelector((state) => state.notificaciones);

    const [paginaActual, setPaginaActual] = useState(0);
    const notificacionesPorPagina = 10; // Cambiá este valor si querés más/menos por página
    
    const offset = paginaActual * notificacionesPorPagina;
    const notificacionesPagina = notificaciones.slice(offset, offset + notificacionesPorPagina);
    const pageCount = Math.ceil(notificaciones.length / notificacionesPorPagina);

     useEffect(() => {
        dispatch(getNotificaciones('archivadas'))
    }, []);


	if (isLoadingNotificaciones)
		return (
              <div className='bg-white h-[150px] flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
				<div className='p-[8px] flex flex-col items-center justify-center rounded-[12px] gap-[8px]'>
                    <Loader color="#FF006E"/>
                    <p className='text-primary texto_20_600'> Cargando... </p>
                </div>
			</div>
		
        )

    if(notificaciones.length === 0) {
        return <div className='bg-white h-[150px] flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
            <div className='bg-bg_primary p-[8px] flex items-center justify-center rounded-[12px] gap-[8px]'>
			    <p className='text-secondary texto_20_600'> No hay notificaciones archivadas </p>
		    </div>
        </div>;
    }

    if(notificaciones === 'error') {
        return <div className='bg-white h-[150px] flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
            
          
            <div className='flex items-center justify-center p-[8px] rounded-[12px] bg-[#FF8661] gap-[8px]'>
                <span className='material-symbols-outlined text-white'>sentiment_sad</span> 
			    <p className='text-white texto_20_600'> Error al cargar las notificaciones archivadas </p>
		    </div>
        
        </div>;
    }

	return (<div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
            
			<div className='border-b-[1px] border-secondary'>
				<p className='text-secondary texto_18_800'>Archivo de comunicaciones</p>
			</div>
            
            <section className="flex flex-col w-full text-bg_secondary">
                {
                    notificacionesPagina.map((notificacion, index) => (
                        <Notificacion
                            index={index + 1}
                            origen={"archivadas"}
                            tipo = {"aumento"}
                            titulo_interno = {notificacion.titulo_interno}
                            fechaIni={notificacion.Desde}
                            fechaFin={notificacion.Hasta}
                            nombre={notificacion.creador_usuario_ldap}
                            titulo={notificacion.Titulo}
                            img={notificacion.archivos ? notificacion.archivos.imagen : ''}
                            msj={notificacion.mensaje_personalizado}
                            lista1={notificacion.archivos ? notificacion.archivos.csv_clientes : ''}
                            lista2={notificacion.archivos ? notificacion.archivos.csv_precios : ''}
                            key={offset + index}
                        />
                    ))
                }
            </section>

            {/* Paginador */}
            {pageCount > 1 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Siguiente >"
                    previousLabel="< Anterior"
                    onPageChange={event => setPaginaActual(event.selected)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    forcePage={paginaActual}
                    containerClassName="flex gap-2 justify-center mt-4 flex-wrap"
                    activeClassName="bg-primary text-white rounded"
                    pageClassName="px-3 py-1 rounded bg-gray-200 texto_16_800 text-subtitle"
                    previousClassName="px-3 py-1 rounded bg-gray-200 texto_16_800 text-subtitle"
                    nextClassName="px-3 py-1 rounded bg-gray-200 texto_16_800 text-subtitle"
                    breakClassName="px-2 py-1 texto_16_800 text-subtitle"
                />
            )}
		</div>
	);
};
