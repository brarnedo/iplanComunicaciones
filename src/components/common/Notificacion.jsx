import {useState} from 'react';
import { useSetState } from 'hooks';
import { useNavigate, Link } from 'react-router-dom';
import { ButtonPrimary, Input, SeparadorV, SeparadorH } from '../../ui/componentes';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';


export const Notificacion = ({
	index,
	origen,	
	tipo,//preguntar
	titulo_interno,
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
	const [deleteNoti, setDeleteNoti] = useState(false);
	const [updateNoti, setUpdateNoti] = useState(false);
	
	const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

	const handleCopy = () => {
		setCopy(true);
		setSeleccionada({ titulo, msj });
	}

	const handleDelete = () => {
		
		setDeleteNoti(true);
		setUpdateNoti(false);
		
	}

	const eliminarCancelar = () => {
		setDeleteNoti(false)
		setUpdateNoti(false);
	}


	const handleUpdate = () => {
		
		setDeleteNoti(false);
		setUpdateNoti(true);
		
	}

	const actualizarCancelar = () => {
		setDeleteNoti(false)
		setUpdateNoti(false);
	}

	// 🎯 VALORES INICIALES (como initialValues en Formik)
	const initialValues = {
		titulo: titulo,
		contenidoComunicacion: msj,
	};

	const validationSchema = Yup.object({
		
		titulo: Yup.string()
			.min(2, 'Mínimo 2 caracteres')
			.required('Ingresa un título'),
	
		contenidoComunicacion: Yup.string()
			.test('is-not-empty', 'Ingresá un contenido', function (value) {
				// Quitar tags HTML para validar contenido real
				const textContent = value?.replace(/<[^>]*>/g, '').trim();
				return textContent && textContent.length > 0;
			})
			.test('max-length', 'Máximo 900 caracteres', function (value) {
				const textContent = value?.replace(/<[^>]*>/g, '') || '';
				return textContent.length <= 900;
			}),
			
	});


	const onSubmit = async (values, { setSubmitting, resetForm }) => {
			
	
		

	};
	


	return (
		<>	
			{index > 1 && <div className='h-[1px] w-full bg-subtitle my-4'></div>}

			<div className='texto_14_500'>{titulo_interno}</div>
		

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
					{origen == "programadas"
					
						?<>
						<button className={`w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer`} onClick={handleUpdate}>
							<span className='material-symbols-outlined'>edit</span>
						</button>
						<button className={`w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer`} onClick={handleDelete}>
							<span className='material-symbols-outlined'>delete</span>
						</button>
						
						</>
						
						:<>
						<Link className={`${copy ? 'hidden' : 'flex'} w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer`} to="/home" onClick={handleCopy}>
							<span className='material-symbols-outlined'>file_copy</span>
						</Link>
						
						</>
					}

								
				</div>
			</div>

			{(!deleteNoti && !updateNoti) && (
			<>
				<div className='bg-bg_primary flex flex-col p-4 mt-4 rounded-[8px]'>
					<h2 className='texto_16_800 text-subtitle'>{titulo}</h2>
					{img &&<img
						alt='notificacion'
						className="max-h-[1000px]"
						src={isLocalhost ? `https://portal2-des.iplan.com.ar/${img.url}` : img.url}
					/>}
					<div className='text-tertiary' dangerouslySetInnerHTML={{ __html: msj }} /> 
				</div>

				{lista1 && 
				<>
					<div className='flex items-center justify-between mt-3'>
						<div className='text-tertiary'>
							<span className='texto_14_500'>Lista de distribución</span>
							<p className='texto_14_500'>{isLocalhost ? `https://portal2-des.iplan.com.ar/${lista1.url}` : lista1.url}</p>
						</div>
						<a className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer' href={isLocalhost ? `https://portal2-des.iplan.com.ar/${lista1.url}` : lista1.url} target="_blank">
							<span className='material-symbols-outlined'>arrow_circle_down</span>
						</a>
					</div>

					
				</>
				}

				
				
				
				{lista2 && 
				<>	
					<div className='h-[1px] w-full bg-bg_secondary my-4'></div>
					<div className='flex items-center justify-between '>
						<div className='text-tertiary '>
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
			
			)}

			{deleteNoti && (
				<>
				<div className='bg-bg_primary flex flex-col items-center gap-[8px] p-4 mt-4  rounded-[8px]'>
					<p className='texto_16_500 text-tertiary'> ¿Estás seguro de eliminar está comunicación?</p>
					<div className='flex flex-col lg:flex-row gap-[8px]'>
						<ButtonPrimary texto='ELIMINAR' click={""}/>	
						<ButtonPrimary texto='CANCELAR' click={eliminarCancelar}/>	
					</div>
				</div>

				<div className='h-[1px] w-full bg-bg_secondary my-4'></div>
				</>
			)

			}

			{updateNoti && (
				<>
				
					<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}>
							{({ values, setFieldValue, handleSubmit, isSubmitting }) => (
				
								
								<Form>
									
										<div className='bg-bg_primary flex flex-col items-center gap-[8px] p-4 mt-4  rounded-[8px]'>
								
											{/* TITULO  / ENVIAR / ARCHIVAR / PUSH */}
											<div className='flex flex-col xl:flex-row items-center xl:items-end gap-[12px] w-full '>
				
												{/** TÍTULO */}
												<div className='w-[100%] relative'>
												
													<Field
														name='titulo'
														component={Input}
														label='Título'
														placeholder='Ingresá...'
													/>
													<ErrorMessage
														name='titulo'
														component='span'
														className='text-red-500 text-sm absolute left-[12px]'
													/>
												</div>
				
				
											</div>
																					
											<div className='flex flex-col'></div>
				
											<SeparadorH separador='16' />

											
				
											{/**  MENSAJE */}
											<div className='flex flex-col relative w-full'>
				
												<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
													Contenido Comunicación
												</label>
															
				
												<Field name='contenidoComunicacion'>
													{({ field, form }) => (
														<ReactQuill
															modules={{
																toolbar: [
																	['bold', 'italic', 'underline'],
																	//[{ header: [1, 2, 3, false] }],
																	//[{ list: 'ordered' }, { list: 'bullet' }],
																	['link'],
																	[{ color: [] }], // ← Color de texto
																	['clean'],
																	
																	
																],
															}}
															value={field.value}
															onChange={value => form.setFieldValue(field.name, value)}
															placeholder='Escribe el contenido...'
															className='bg-white text-black texto_16_500 pl-[12px] pr-[12px] pt-[12px] pb-[12px] rounded-[8px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 resize-none'
														/>
														
													)}
				
											
												</Field>
				
												<ErrorMessage
													name='contenidoComunicacion'
													component='span'
													className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]'
												/>
				
										
											</div>
											
											<div className='flex flex-col'></div>
											<SeparadorH separador='16' />
											
											{/** BOTON SUMMIT */}
											
											
											<div className='flex flex-col items-center justify-center lg:justify-end  lg:flex-row gap-[8px] w-full'>
												<ButtonPrimary texto='CANCELAR' click={actualizarCancelar}/>	
												<ButtonPrimary texto='ACTUALIZAR' type='submit'/>	
											</div>

										</div>
													
								</Form>
							)}
				
					</Formik>


			

				<div className='h-[1px] w-full bg-bg_secondary my-4'></div>
				</>
			)

			}


		</>
	);
};
