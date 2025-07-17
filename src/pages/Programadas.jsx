import { Notificacion } from 'components'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getNotificaciones } from 'store';
import {useSelector} from 'react-redux';
import { Loader, SeparadorH, ButtonPrimary } from 'componentesUI';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

import {
  setStatusUpdate,
  
} from "../store/slices/updateNotificaciones/updateNotificacionesSlice";


export const Programadas = () => {

   
    const [editando, setEditando] = useState("");
    const [eliminando, setEliminando] = useState("");

    const dispatch = useDispatch();
    const { notificaciones, isLoadingNotificaciones } = useSelector((state) => state.notificaciones);
  

    const { isLoadingUpdateNotificaciones, statusUpdate } = useSelector(
		state => state.updateNotificaciones,
	);

    const { isLoadingDeleteNotificaciones } = useSelector(
		state => state.deleteNotificaciones,
	);

 
    // Tamaño de página y estado de página actual
    const [paginaActual, setPaginaActual] = useState(0);
    const notificacionesPorPagina = 10; // Cambiá este valor si querés más/menos por página
    
    // Calcular las notificaciones a mostrar en la página actual
    const offset = paginaActual * notificacionesPorPagina;
    const notificacionesPagina = notificaciones.slice(offset, offset + notificacionesPorPagina);
    const pageCount = Math.ceil(notificaciones.length / notificacionesPorPagina);

    useEffect(() => {
        dispatch(getNotificaciones('programadas'));
        dispatch(setStatusUpdate(''));
        setEditando("");
        setEliminando("");
        
    }, []);

   if (isLoadingNotificaciones){
		return (
			
            <div className='bg-white h-[150px] flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
				<div className='p-[8px] flex flex-col items-center justify-center rounded-[12px] gap-[8px]'>
                    <Loader color="#FF006E"/>
                    <p className='text-primary texto_20_600'> Cargando... </p>
                </div>
			</div>
		
        );
    }

    if(notificaciones.length === 0) {
        return <div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
            <div className="flex items-center justify-center">
                <p className='texto_16_800 text-subtitle'>No hay notificaciones programadas</p>
            </div>
        </div>;
    }

    if(notificaciones === 'error') {
        return <div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
            <div className="flex items-center justify-center">
                <p className='texto_16_800 text-subtitle'>Error al cargar las notificaciones programadas</p>
            </div>
        </div>;
    }

    if(isLoadingUpdateNotificaciones){
    
        return (
            <div className='bg-white h-[150px] flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
                <div className='p-[8px] flex flex-col items-center justify-center rounded-[12px] gap-[8px]'>
                    <Loader color="#7b828c"/>
                    <p className='text-tertiary texto_20_600'> Editando, esperá por favor... </p>
                </div>
            </div>
        )

    }
    

    const handleVolver = async () => {
        // 1. Resetear el estado de edición
        setEditando('');
        setEliminando('');
        
        // 2. Recargar las notificaciones 
        dispatch(getNotificaciones('programadas'));
    };

    if(editando != ''){

        if(editando.Respuesta == "OK"){

            return(
                <div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
                
                    <div className='border-b-[1px] border-secondary'>
                        <p className='text-secondary texto_18_800'>Comunicaciones programadas</p>
                    </div>

                    <div className='flex items-center justify-center p-[8px] rounded-[12px] bg-[#6FDD58] gap-[8px]'>
                        <span className='material-symbols-outlined text-white'>sentiment_satisfied</span> 
                        <p className='text-white texto_20_600'> {editando.data.message} </p>
                    </div>

                    <SeparadorH separador='4' />
                    <div className='flex items-start justify-center lg:justify-end'>
                    <ButtonPrimary
                        texto='VOLVER'
                        click={handleVolver}
                    />
                    </div>
                </div>
            )
        }else{
            return(
                <div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
                
                    <div className='border-b-[1px] border-secondary'>
                        <p className='text-secondary texto_18_800'>Comunicaciones programadas</p>
                    </div>

                    <div className='flex items-center justify-center p-[8px] rounded-[12px] bg-[#FF8661] gap-[8px]'>
                        <span className='material-symbols-outlined text-white'>sentiment_satisfied</span> 
                        <p className='text-white texto_20_600'> {editando.data.message} </p>
                    </div>

                    <SeparadorH separador='4' />
                    <div className='flex items-start justify-center lg:justify-end'>
                    <ButtonPrimary
                        texto='VOLVER'
                        click={handleVolver}
                    />
                    </div>
                </div>
            )
        }
    }

       
    if(isLoadingDeleteNotificaciones){

      
        return (
            <div className='bg-white h-[150px] flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
                <div className='p-[8px] flex flex-col items-center justify-center rounded-[12px] gap-[8px]'>
                    <Loader color="#7b828c"/>
                    <p className='text-tertiary texto_20_600'> Eliminando, esperá por favor... </p>
                </div>
            </div>
        )
        
    }

    if(eliminando != ''){

        if(eliminando == "OK"){

            return(
                <div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
                
                    <div className='border-b-[1px] border-secondary'>
                        <p className='text-secondary texto_18_800'>Comunicaciones programadas</p>
                    </div>

                    <div className='flex items-center justify-center p-[8px] rounded-[12px] bg-[#6FDD58] gap-[8px]'>
                        <span className='material-symbols-outlined text-white'>sentiment_satisfied</span> 
                        <p className='text-white texto_20_600'> {eliminando.data.message} </p>
                    </div>

                    <SeparadorH separador='4' />
                    <div className='flex items-start justify-center lg:justify-end'>
                    <ButtonPrimary
                        texto='VOLVER'
                        click={handleVolver}
                    />
                    </div>
                </div>
            )
        }else{
            return(
                <div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
                
                    <div className='border-b-[1px] border-secondary'>
                        <p className='text-secondary texto_18_800'>Comunicaciones programadas</p>
                    </div>

                    <div className='flex items-center justify-center p-[8px] rounded-[12px] bg-[#FF8661] gap-[8px]'>
                        <span className='material-symbols-outlined text-white'>sentiment_satisfied</span> 
                        <p className='text-white texto_20_600'> {eliminando.data.message} </p>
                    </div>

                    <SeparadorH separador='4' />
                    <div className='flex items-start justify-center lg:justify-end'>
                    <ButtonPrimary
                        texto='VOLVER'
                        click={handleVolver}
                    />
                    </div>
                </div>
            )
        }
    }

	return (<div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
            
			<div className='border-b-[1px] border-secondary'>
				<p className='text-secondary texto_18_800'>Comunicaciones programadas</p>
			</div>
               <>
                <section className="flex flex-col w-full text-bg_secondary">
                
                    {
                        notificacionesPagina.map((notificacion, index) => (
                            <Notificacion
                                id={notificacion.id}
                                index={index + 1}
                                origen = {"programadas"}
                                tipo = {""}
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
                                editando={editando}
                                setEditando= {setEditando}
                                eliminando={eliminando}
                                setEliminando={setEliminando}
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
                        activeClassName="bg-[#FF006E] text-white rounded"
                        pageClassName="px-3 py-1 rounded bg-gray-200 texto_16_800 text-subtitle"
                        previousClassName="px-3 py-1 rounded bg-gray-200 texto_16_800 text-subtitle"
                        nextClassName="px-3 py-1 rounded bg-gray-200 texto_16_800 text-subtitle"
                        breakClassName="px-2 py-1 texto_16_800 text-subtitle"
                    />
                )}

            </>
        </div>
        
	);
};
