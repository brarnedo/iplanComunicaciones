import { Notificacion } from 'components'
import { getArchivadas } from '../store/slices/getArchivadas/thunks';
import { useDispatch } from 'react-redux';
import { ButtonPrimary } from '../ui/componentes';

export const Archivadas = () => {

    const dispatch = useDispatch();

    const traerArchivadas = async () => {

        const respuesta = await dispatch(getArchivadas());

        console.log(respuesta);
    }
    
	return (
		<>
        <div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
            
            <div className='flex flex-col lg:flex-row mt-[16px] justify-end gap-[8px]'>
                                <ButtonPrimary 
                                texto='TRAER NOTIFICACIONES' 
                                click={traerArchivadas}
                                />
                            </div>

			<div className='border-b-[1px] border-secondary'>
				<p className='text-secondary texto_18_800'>Archivo de comunicaciones</p>
			</div>
            
            <section className="flex flex-col w-full text-bg_secondary">
               
                <Notificacion
                    tipo='COMUNICACIÓN GENERAL'
                    fechaIni='21-07-2025'
                    fechaFin='Sin vencimiento'
                    nombre='Cliente Ejemplo'
                    titulo='¡OFERTA ESPECIAL!'
                    img={false}
                    msj='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..'
                />
                <Notificacion
                    tipo='NOTIFICACIÓN DE AUMENTO'
                    fechaIni='06-05-2025'
                    fechaFin='30-09-2025'
                    nombre='Cliente Ejemplo'
                    titulo='CAMBIOS EN TU FACTURA'
                    msj='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..'
                    lista1='Base-oferta-800MB-octubre.XLS'
                    lista2='Base-servicios_afectados-octubre.XLS'
                />
            </section>
		</div>
        </>
	);
};
