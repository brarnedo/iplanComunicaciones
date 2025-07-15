import img1 from '/imgNotificaciones/imgNotificacionFacturas.jpg';
export const Notificacion = ({
	tipo,
	fechaIni,
	fechaFin,
	nombre,
	titulo,
    img,
	msj,
	lista1,
	lista2,
}) => {

	return (
		<>
			<div className='texto_14_500'>{tipo}</div>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center gap-2'>
					<p className='text-primary texto_16_800'>{fechaIni}</p> |
					<p className='text-primary texto_16_800'>{fechaFin}</p> |
					<p className='flex items-center gap-3'>
						<span className='material-symbols-outlined'>id_card</span> {nombre}
					</p>
				</div>

				{/* iconos */}
				<div className='flex gap-2'>
					<div className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'>
						<span className='material-symbols-outlined'>file_copy</span>
					</div>
					<div className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'>
						<span className='material-symbols-outlined'>edit</span>
					</div>
					<div className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'>
						<span className='material-symbols-outlined'>delete</span>
					</div>
				</div>
			</div>

			<div className='bg-bg_primary flex flex-col p-4 mt-4 rounded-[8px]'>
				<h2 className='texto_16_800 text-subtitle'>{titulo}</h2>
				{img &&<img
					alt='notificacion'
					className="max-h-[1000px]"
					src={img1}
				/>}
				<p className='texto_14_500 text-tertiary'>{msj}</p>
			</div>

			{lista1 && 
                <div className='flex items-center justify-between'>
                    <div className='text-tertiary mt-3'>
                        <p className='texto_14_500'>Lista de distribución</p>
                        <p className='texto_16_500'>{lista1}</p>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'>
                        <span className='material-symbols-outlined'>arrow_circle_down</span>
                    </div>
                </div>
            }

			<div className='h-[1px] w-full bg-bg_secondary my-4'></div>
            
            {lista2 && 
                <div className='flex items-center justify-between'>
                    <div className='text-tertiary mt-3'>
                        <p className='texto_14_500'>Lista de servicios afectados</p>
                        <p className='texto_16_500'>{lista2}</p>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'>
                        <span className='material-symbols-outlined'>arrow_circle_down</span>
                    </div>
                </div>
            }
			
		</>
	);
};
