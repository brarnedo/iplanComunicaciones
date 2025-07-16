import {useState} from 'react';
import { useSetState } from 'hooks';
import { useNavigate, Link } from 'react-router-dom';


export const Notificacion = ({
	index,
	tipo,//preguntar
	fechaIni,
	fechaFin,
	nombre,
	titulo,
    img,//
	msj,
	lista1,//
	lista2,//
}) => {
	const { setSeleccionada } = useSetState();
	const [copy, setCopy] = useState(false);
	const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

	const handleCopy = () => {
		setCopy(true);
		setSeleccionada({ titulo, msj });
	}
	return (
		<>	
			{index > 1 && <div className='h-[1px] w-full bg-subtitle my-4'></div>}

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
					<Link className={`${copy ? 'hidden' : 'flex'} w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer`} to="/home" onClick={handleCopy}>
						<span className='material-symbols-outlined'>file_copy</span>
					</Link>
					{/* <Link className={`${copy ? 'flex' : 'hidden'} w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer`} to="/home">
						<span className='material-symbols-outlined'>check</span>
					</Link> */}
					{/* <div className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'>
						<span className='material-symbols-outlined'>edit</span>
					</div>
					<div className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'>
						<span className='material-symbols-outlined'>delete</span>
					</div> */}
				</div>
			</div>

			<div className='bg-bg_primary flex flex-col p-4 mt-4 rounded-[8px]'>
				<h2 className='texto_16_800 text-subtitle'>{titulo}</h2>
				{img &&<img
					alt='notificacion'
					className="max-h-[1000px]"
					src={isLocalhost ? `https://portal2-des.iplan.com.ar${img.url}` : img.url}
				/>}
				<p className='texto_14_500 text-tertiary'>
					<div dangerouslySetInnerHTML={{ __html: msj }} />
				</p>
			</div>

			{lista1 && 
				<div className='flex items-center justify-between'>
					<div className='text-tertiary mt-3'>
						<span className='texto_14_500'>Lista de distribución</span>
						<p className='texto_14_500'>{isLocalhost ? `https://portal2-des.iplan.com.ar/${lista1.url}` : lista1.url}</p>
					</div>
					<a className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer' href={isLocalhost ? `https://portal2-des.iplan.com.ar/${lista1.url}` : lista1.url} target="_blank">
						<span className='material-symbols-outlined'>arrow_circle_down</span>
					</a>
				</div>
            }

            
            {lista2 && 
				<>
					<div className='h-[1px] w-full bg-bg_secondary my-4'></div>

                	<div className='flex items-center justify-between'>
                    <div className='text-tertiary mt-3'>
                        <p className='texto_14_500'>Lista de servicios afectados</p>
                        <p className='texto_14_500'>{isLocalhost ? `https://portal2-des.iplan.com.ar/${lista2.url}` : lista2.url}</p>
                    </div>
                    <a className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer' href={isLocalhost ? `https://portal2-des.iplan.com.ar/${lista2.url}` : lista2.url} target="_blank">
                        <span className='material-symbols-outlined'>arrow_circle_down</span>
                    </a>
                	</div>
				</>
            }
			
		</>
	);
};
