import { BASE } from "env";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSetState } from 'hooks';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateNotificaciones } from 'store';
import * as Yup from 'yup';


import Cookies from "js-cookie";

import {
	ButtonPrimary,
	Input,
	SeparadorH,
	SeparadorV,
	Loader
} from '../../ui/componentes';



export const Notificacion = ({
	id,
	index,
	origen,
	tipo, //preguntar
	titulo_interno,
	fechaIni,
	fechaFin,
	nombre,
	titulo,
	img, //
	msj,
	msjPush,
	lista1, //
	lista2, //

	editando,
	setEditando,
	eliminando,
	setEliminando
}) => {


	// const urlImagen = 'https://portal2-des.iplan.com.ar/'; //DESA
	// const urlImagen = 'https://www.iplan.com.ar/'; //PROD
	const urlImagen = `${BASE}`; //PROD
	// const urlImagen = 'https://portal-desa-cloud.iplan.com.ar/'; //NUEVO SERVER
	// const urlImagen = 'https://portal-prod-cloud.iplan.com.ar/'; //NUEVO SERVER

	const dispatch = useDispatch();
	let navigate = useNavigate();

	const { setSeleccionada } = useSetState();
	const [copy, setCopy] = useState(false);
	const [deleteNoti, setDeleteNoti] = useState(false);
	const [updateNoti, setUpdateNoti] = useState(false);



	const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

	const handleCopy = () => {
		setCopy(true);
		setSeleccionada({ titulo, msj, tipo: (lista2 ? "aumento" : "general") });
	}

	const handleDelete = () => {
		setDeleteNoti(true);
		setUpdateNoti(false);
	};

	const eliminarCancelar = () => {
		setDeleteNoti(false);
		setUpdateNoti(false);
	};

	const eliminarComunicacion = async () => {
		const respuesta = await dispatch(updateNotificaciones(id, true));
		setEliminando(respuesta);
	};


	const [charCount, setCharCount] = useState(0);
	const maxLength = 900;
	const getPlainText = (html) => {
		if (!html) return '';
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		return doc.body.textContent || doc.body.innerText || '';
	};


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
				const parser = new DOMParser();
				const doc = parser.parseFromString(value, 'text/html');
				const textContent = doc.body.textContent || doc.body.innerText || '';

				return textContent.length <= 900;
			}),
	});

	const handleUpdate = () => {
		setDeleteNoti(false);
		setUpdateNoti(true);
	};

	const actualizarCancelar = () => {
		setDeleteNoti(false);
		setUpdateNoti(false);
	};


	const onSubmit = async (values, { setSubmitting, resetForm }) => {

		const respuesta = await dispatch(updateNotificaciones(id, false, values));
		//console.log("onSubmit", respuesta);
		setEditando(respuesta);

	};

	const [descargarPush, setDescargarPush] = useState(false);

	const traerReporte = async () => {


		const urlBase = 'https://www.iplan.com.ar/'; // PROD
		// const urlBase = 'https://portal-desa-cloud.iplan.com.ar/'; // NUEVO SERVER

		const myHeader = {
			'Authorization': `Bearer ${Cookies.get('token')}`,
			'Content-Type': 'application/json'
		};

		const url = `${urlBase}comunicaciones/notificaciones_new/api/notifications/push-results.php?notification_id=${id}`;

		const requestConfig = {
			method: "GET",
			headers: myHeader,
			credentials: 'include',
		};

		try {

			const response = await fetch(url, requestConfig);

			if (!response.ok) {
				console.log("FALLO - Response no OK");
				setDescargarPush(true);
				return { "Respuesta": "ERROR", "data": null }
			}

			const blob = await response.blob();

			const blobUrl = window.URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = blobUrl;
			link.download = `reporte_push_${id}_${new Date().toISOString().split('T')[0]}.csv`; // Nombre del archivo

			// AGREGAR AL DOM, HACER CLICK Y REMOVER
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			// LIMPIAR URL TEMPORAL
			window.URL.revokeObjectURL(blobUrl);

			setDescargarPush(false);
			return { "Respuesta": "OK", "data": "Descarga iniciada" };

		} catch (error) {
			console.error("Error en catch:", error);
			setDescargarPush(true)

			// Manejo de sesión expirada
			if (error.response?.data?.error_type === "session_expired") {
				Cookies.remove('token');
				window.location.href = '/comunicaciones/#/error';
			} else {
				return { "Respuesta": "ERROR", "data": null };
			}
		}


	}

	return (
		<>
			{index > 1 && <div className='h-[1px] w-full bg-subtitle my-4'></div>}

			<div className='texto_14_500'>{titulo_interno}


			</div>

			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center gap-2'>
					<p className='text-primary texto_16_800'>{fechaIni}</p> |
					<p className='text-primary texto_16_800'>{fechaFin}</p> |
					<p className='flex items-center gap-3'>
						<span className='material-symbols-outlined'>id_card</span> {nombre}
					</p>
					{msjPush && (
						<>
							| <p className='text-secondary texto_16_800'> PUSH </p>
						</>

					)}


				</div>

				{/* iconos */}
				<div className='flex gap-2'>

					{origen == 'programadas' ? (
						<>
							<button
								className={`w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer`}
								onClick={handleUpdate}>
								<span className='material-symbols-outlined'>edit</span>
							</button>
							<button
								className={`w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer`}
								onClick={handleDelete}>
								<span className='material-symbols-outlined'>delete</span>
							</button>
						</>
					) : (
						<>
							<Link
								className={`${copy ? 'hidden' : 'flex'} w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer`}
								to='/home'
								onClick={handleCopy}>
								<span className='material-symbols-outlined'>file_copy</span>
							</Link>
						</>
					)}

				</div>
			</div>



			{!deleteNoti && !updateNoti && (
				<>
					<div className='bg-bg_primary flex flex-col p-4 mt-4 rounded-[8px]'>
						<h2 className='texto_16_800 text-subtitle'>{titulo}</h2>
						{img && (


							<div>
								<img
									alt='notificacion'

									src={
										isLocalhost
											? `${urlImagen}${img.url}`
											: img.url
									}
								/>
							</div>
						)}
						<div
							className='text-tertiary'
							dangerouslySetInnerHTML={{ __html: msj }}
						/>
					</div>

					{lista1 && (
						<>
							<div className='flex items-center justify-between mt-3'>
								<div className='text-tertiary'>
									<span className='texto_14_500'>Lista de distribución</span>
									<p className='texto_14_500'>
										{isLocalhost
											? `${urlImagen}${img.url}`
											: lista1.url}
									</p>
								</div>
								<a
									className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'
									href={
										isLocalhost
											? `${urlImagen}${img.url}`
											: lista1.url
									}
									target='_blank'>
									<span className='material-symbols-outlined'>
										arrow_circle_down
									</span>
								</a>
							</div>
						</>
					)}

					{lista2 && (
						<>
							<div className='h-[1px] w-full bg-bg_secondary my-4'></div>
							<div className='flex items-center justify-between '>
								<div className='text-tertiary '>
									<p className='texto_14_500'>Lista de servicios afectados</p>
									<p className='texto_14_500'>
										{isLocalhost
											? `${urlImagen}${img.url}`
											: lista2.url}
									</p>
								</div>
								<a
									className='w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'
									href={
										isLocalhost
											? `${urlImagen}${img.url}`
											: lista2.url
									}
									target='_blank'>
									<span className='material-symbols-outlined'>
										arrow_circle_down
									</span>
								</a>
							</div>
						</>
					)}

					{msjPush && (
						<>
							<div className='h-[1px] w-full bg-bg_secondary my-4'></div>
							<div className='flex flex-col items-end justify-end'>

								<ButtonPrimary texto={"REPORTE"} click={traerReporte} />

								{descargarPush && (
									<span className='text-red-500 text-sm'> No se pudo descargar el reporte </span>
								)}

							</div>


						</>
					)}
				</>
			)}

			{deleteNoti && (
				<>
					<div className='bg-bg_primary flex flex-col items-center gap-[8px] p-4 mt-4  rounded-[8px]'>
						<p className='texto_16_500 text-tertiary'>
							{' '}
							¿Estás seguro de eliminar está comunicación?
						</p>
						<div className='flex flex-col lg:flex-row gap-[8px]'>
							<ButtonPrimary
								texto='ELIMINAR'
								click={eliminarComunicacion}
							/>
							<ButtonPrimary
								texto='CANCELAR'
								click={eliminarCancelar}
							/>
						</div>
					</div>

				</>
			)}

			{updateNoti && (
				<>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{({ values, setFieldValue, handleSubmit, isSubmitting }) => (
							<Form>


								<>
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
														onChange={(value) => {
															const text = getPlainText(value);
															const textLength = text.length;

															setCharCount(textLength);
															form.setFieldValue(field.name, value);

														}}
														placeholder='Escribe el contenido...'
														className='bg-white text-black texto_16_500 pl-[12px] pr-[12px] pt-[12px] pb-[12px] rounded-[8px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 resize-none'
													/>
												)}
											</Field>


											{/* CONTADOR DE CARACTERES */}



											<div className='flex justify-end mt-1 pr-[12px]'>
												<ErrorMessage
													name='contenidoComunicacion'
													component='span'
													className='text-red-500 text-sm absolute bottom-[-1px] left-[12px]'
												/>

												<span className={`texto_12_500 ${charCount > maxLength ? 'text-red-500' : 'text-tertiary'
													}`}>
													{charCount}/{maxLength}
												</span>
											</div>
										</div>

										<div className='flex flex-col'></div>
										<SeparadorH separador='16' />

										{/** BOTON SUMMIT */}
										<div className='flex flex-col items-center justify-center lg:justify-end  lg:flex-row gap-[8px] w-full'>
											<ButtonPrimary
												texto='CANCELAR'
												click={actualizarCancelar}
											/>
											<ButtonPrimary
												texto='ACTUALIZAR'
												type='submit'
											/>
										</div>

									</div>
								</>




							</Form>
						)}
					</Formik>


				</>
			)}

		</>
	);
};
