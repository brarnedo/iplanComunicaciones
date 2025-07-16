import { Loader } from 'componentesUI';
import { Notificacion } from 'components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getNotificaciones } from 'store';

export const Programadas = () => {

	const { notificaciones, isLoadingNotificaciones } = useSelector(
		state => state.notificaciones,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNotificaciones('programadas'));
	}, []);

	if (isLoadingNotificaciones)
		return (
			
            <div className='bg-white h-[150px] flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
				<div className='p-[8px] flex flex-col items-center justify-center rounded-[12px] gap-[8px]'>
                    <Loader color="#FF006E"/>
                    <p className='text-primary texto_20_600'> Cargando... </p>
                </div>
			</div>
		
        );

	return (
		<div className='bg-white flex-1 p-[16px] rounded-[12px] mr-[124px] flex flex-col gap-[16px]'>
			<div className='pb-[12px] border-b-[1px] border-secondary'>
				<p className='text-secondary texto_18_800'>
					{' '}
					Comunicaciones programadas
				</p>
			</div>

			<section className='flex flex-col w-full text-bg_secondary'>
				{notificaciones.map((notificacion, index) => (
					<Notificacion
                        origen={"programadas"}
						tipo={""}
                        titulo_interno={notificacion.titulo_interno}
						fechaIni={notificacion.Desde}
						fechaFin={notificacion.Hasta}
						nombre={notificacion.creador_usuario_ldap}
						titulo={notificacion.Titulo}
						img={notificacion.archivos ? notificacion.archivos.imagen : ''}
						msj={notificacion.mensaje_personalizado}
						lista1={
							notificacion.archivos ? notificacion.archivos.csv_clientes : ''
						}
						lista2={
							notificacion.archivos ? notificacion.archivos.csv_precios : ''
						}
						key={index}
					/>
				))}
			</section>
		</div>
	);
};
