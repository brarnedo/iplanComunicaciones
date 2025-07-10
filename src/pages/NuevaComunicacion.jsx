import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';

import {
	ButtonPrimary,
	Input,
	SeparadorH,
	SeparadorV,
} from '../ui/componentes';
export { ButtonPrimary } from '../ui/componentes/ButtonPrimary';

export const NuevaComunicacion = () => {
	const [tipoComunicación, setTipoComunicación] = useState(0);

	const btnVolver = () => {
		setTipoComunicación(0);
	};

	return (
		<div className='bg-white flex-1 p-[16px] rounded-[12px] mr-[124px] flex flex-col gap-[16px]'>
			<div className='pb-[12px] border-b-[1px] border-secondary flex justify-between'>
				<p className='text-secondary texto_18_800'> Nueva comunicación </p>

				{tipoComunicación != 0 && (
					<span
						class='material-symbols-outlined text-white bg-primary p-[5px] rounded-[555px] cursor-pointer'
						onClick={btnVolver}>
						delete_forever
					</span>
				)}
			</div>

			{tipoComunicación == 0 && (
				<div className='bg-bg_primary flex flex-1 flex-col p-[16px] rounded-[12px] pt-[33px]'>
					<div className='flex gap-[24px]'>
						<div className='relative'>
							<label className='texto_12_500 text-secondary absolute left-[8px] top-[-18px] rounded-xl px-[1px] '>
								Tipo de comunicación
							</label>
							<select
								className={`texto_16_500 text-tertiary focus:outline-none disabled:bg-disabled rounded-[8px] py-[8px] px-[12px] w-[400px] border border-tertiary ${
									tipoComunicación === '0' ? 'text-gray-400' : 'text-tertiary'
								}`}
								value={tipoComunicación}
								onChange={e => setTipoComunicación(e.target.value)}>
								<option
									value='0'
									disabled>
									Seleccionar...
								</option>{' '}
								{/* ← disabled para que no se pueda volver a seleccionar */}
								<option value='1'>Notificación de aumento</option>
								<option value='2'>Evento Masivo</option>
								<option value='3'>Comunicación General</option>
							</select>
						</div>

						{/* <ButtonPrimary texto='CONFIGURAR' /> */}
					</div>
				</div>
			)}

			{/** Fomulario Aumento */}

			{tipoComunicación == 1 && <FormularioAumento />}

			{tipoComunicación == 3 && <FormularioGeneral />}
		</div>
	);
};

const FormularioAumento = () => {
	const [isOn, setIsOn] = useState(false);

	const onToggle = () => {
		if (isOn) {
			setIsOn(false);
		} else {
			setIsOn(true);
		}
	};

	//let disabledON = false;

	// 🎯 VALORES INICIALES (como initialValues en Formik)
	const initialValues = {
		titulo: '',
		fechaEnviar: '',
		fechaArchivar: '',
		contenidoComunicacion: '',
		listadoDistribuccion: '',
		listadoServicio: '',
	};

	const validationSchema = Yup.object({
		titulo: Yup.string()
			.min(2, 'Mínimo 2 caracteres')
			.required('Nombre es requerido'),
		fechaEnviar: Yup.date()
			.min(new Date(), 'La fecha no puede ser anterior a hoy')
			.required('Fecha requerida'),
		fechaArchivar: Yup.date()
			.min(new Date(), 'La fecha no puede ser anterior a hoy')
			.required('Fecha requerida'),
		contenidoComunicacion: Yup.string()
			.test('is-not-empty', 'Contenido es requerido', function (value) {
				// Quitar tags HTML para validar contenido real
				const textContent = value?.replace(/<[^>]*>/g, '').trim();
				return textContent && textContent.length > 0;
			})
			.test('max-length', 'Máximo 500 caracteres', function (value) {
				const textContent = value?.replace(/<[^>]*>/g, '') || '';
				return textContent.length <= 500;
			}),
		listadoDistribuccion: Yup.string().required('Debés adjuntar un archivo'),

		listadoServicio: Yup.string().required('Debés adjuntar un archivo'),
	});

	const onSubmit = (values, { setSubmitting, resetForm }) => {
		console.log('Datos enviados:', values);

		// Simular envío al servidor
		setTimeout(() => {
			alert('¡Formulario enviado con Formik!');
			setSubmitting(false);
			resetForm(); // Limpia el formulario
		}, 1000);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}>
			{({ values, setFieldValue, handleSubmit }) => (
				<Form>
					<div className='bg-bg_primary flex flex-1 flex-col p-[16px] rounded-[12px] pt-[16px] gap-[16px]'>
						<div className='pb-[12px] border-b-[1px] border-tertiary'>
							<p className='text-primary texto_20_500'>
								Notificación de aumento
							</p>
						</div>

						{/* PRIMERA FILA MOVILE*/}
						<div className='flex items-end gap-[12px] '>
							{/** TÍTULO */}
							<div className='w-[100%] relative'>
								{/* <Input
								label='Título'
								placeholder='Ingresá...'
								name='titulo'
							/> */}

								<Field
									name='titulo'
									component={Input}
									label='Título'
									placeholder='Ingresá...'
								/>
								<ErrorMessage
									name='titulo'
									component='span'
									className='text-red-500 text-sm mt-1 absolute left-[12px]'
								/>
							</div>

							<SeparadorV
								height='60'
								separador='0'
							/>

							{/** ENVIAR */}
							<div className='flex flex-col relative'>
								<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
									Enviar:
								</label>

								<Field
									type='date'
									name='fechaEnviar'
									className='calendar-primary texto_16_500 text-secondary pl-[12px] pr-[12px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-[160px]'
								/>

								<ErrorMessage
									name='fechaEnviar'
									component='span'
									className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-23px]'
								/>
							</div>

							<SeparadorV
								height='0'
								separador='-6'
							/>

							{/** ARCHIVAR */}
							<div className='flex flex-col relative'>
								<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
									Archivar:
								</label>

								<Field
									type='date'
									name='fechaArchivar'
									className='calendar-primary texto_16_500 text-secondary pl-[12px] pr-[12px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-[160px]'
								/>

								<ErrorMessage
									name='fechaArchivar'
									component='span'
									className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-23px]'
								/>
							</div>

							<SeparadorV
								height='60'
								separador='0'
							/>

							{/* Switch 1 */}
							<div className='flex items-end gap-3 w-[40%] pb-[6px]'>
								<label className='texto_12_500 text-tertiary pb-[5px]'>
									¿Es push?
								</label>
								{/* 🔘 SWITCH BUTTON */}
								<button
									onClick={onToggle}
									//disabled={disabled}
									className={`
                            relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none 
                            ${isOn ? 'bg-primary' : 'bg-gray-300'}
                            
                            `}>
									{/* CÍRCULO QUE SE MUEVE CON TEXTO DENTRO */}
									<span
										className={`
                                    inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg text-xs font-bold
                                    ${isOn ? 'translate-x-7 text-primary' : 'translate-x-1 text-gray-500'}
                                `}>
										{isOn ? 'SÍ' : 'NO'}
									</span>
								</button>
							</div>
						</div>

						<div className='flex flex-col'></div>

						{/**  Segunda fila */}
						<div className='flex flex-col relative'>
							<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
								Contenido Comunicación
							</label>

							<Field name='contenidoComunicacion'>
								{({ field, form }) => (
									<ReactQuill
										modules={{
											toolbar: [
												['bold', 'italic', 'underline'],
												[{ header: [1, 2, 3, false] }],
												[{ list: 'ordered' }, { list: 'bullet' }],
												['link'],
												[{ color: [] }], // ← Color de texto
												['clean'],
											],
										}}
										value={field.value}
										onChange={value => form.setFieldValue(field.name, value)}
										placeholder='Escribe el contenido...'
										className='bg-white texto_16_500 text-secondary pl-[12px] pr-[12px] pt-[12px] pb-[12px] rounded-[8px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 resize-none'
									/>
								)}
							</Field>

							<ErrorMessage
								name='contenidoComunicacion'
								component='span'
								className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-0px]'
							/>

							{/* CONTADOR DE CARACTERES */}

							<div className='flex justify-end mt-1 pr-[12px]'>
								<span className={`texto_12_500 text-tertiary`}>0/200</span>
							</div>

							{/* {maxLength && (
						<div className='flex justify-end mt-1 pr-[12px]'>
							<span
								className={`texto_11_400 ${charCount > maxLength * 0.9 ? 'text-red-500' : 'text-tertiary'}`}>
								{charCount}/{maxLength}
							</span>
						</div>
					)} */}
						</div>

						{/** Tercera fila */}
						<SeparadorH separador='0' />

						<div className='flex flex-col'>
							<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
								Lista de distribucción
							</label>
							<div className='flex gap-2'>
								{/* INPUT */}
								<div className='relative w-full'>
									<Field
										type='text'
										placeholder={'Nombre del archivo..'}
										readOnly
										name='listadoDistribuccion'
										className='texto_16_500 text-tertiary pl-[12px] pr-[40px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 cursor-default'
										onFocus={e => e.target.blur()} // ← Quita el focus inmediatamente
										style={{ caretColor: 'transparent' }} // ← Oculta el cursor de texto
									/>

									<ErrorMessage
										name='listadoDistribuccion'
										component='span'
										className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]'
									/>
								</div>

								{/* BOTÓN BUSCAR */}
								<ButtonPrimary texto='BUSCAR' />
							</div>
						</div>

						<div className='flex flex-col'></div>
						{/** Cuarta fila */}

						<div className='flex flex-col'>
							<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
								Lista de servicios afectados
							</label>

							<div className='flex gap-2'>
								{/* INPUT */}
								<div className='relative w-full'>
									<Field
										type='text'
										placeholder={'Nombre del archivo..'}
										readOnly
										name='listadoServicio'
										className='texto_16_500 text-tertiary pl-[12px] pr-[40px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 cursor-default'
										onFocus={e => e.target.blur()} // ← Quita el focus inmediatamente
										style={{ caretColor: 'transparent' }} // ← Oculta el cursor de texto
									/>

									<ErrorMessage
										name='listadoServicio'
										component='span'
										className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]'
									/>
								</div>

								{/* BOTÓN BUSCAR */}
								<ButtonPrimary texto='BUSCAR' />
							</div>
						</div>

						<SeparadorH separador='0' />

						<div className='flex justify-end'>
							{/* BOTÓN BUSCAR */}
							<ButtonPrimary
								texto='ENVIAR'
								type='submit'
							/>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const FormularioGeneral = () => {
	const [isOn, setIsOn] = useState(false);

	const onToggle = () => {
		if (isOn) {
			setIsOn(false);
		} else {
			setIsOn(true);
		}
	};



	const [selectedFile, setSelectedFile] = useState(null);
	const [fileFormData, setFileFormData] = useState(new FormData());

	const fileInputRef = useRef(null);

	// 🎯 VALORES INICIALES (como initialValues en Formik)
	const initialValues = {
		titulo: '',
		fechaEnviar: '',
		fechaArchivar: '',
		contenidoComunicacion: '',
		imagen: '',
	};

	const validationSchema = Yup.object({
		titulo: Yup.string()
			.min(2, 'Mínimo 2 caracteres')
			.required('Nombre es requerido'),
		fechaEnviar: Yup.date()
			.min(new Date(), 'Fecha invalida')
			.required('Fecha requerida'),
		fechaArchivar: Yup.date()
			.min(new Date(), 'Fecha invalida')
			.required('Fecha requerida'),
		contenidoComunicacion: Yup.string()
			.test('is-not-empty', 'Contenido es requerido', function (value) {
				// Quitar tags HTML para validar contenido real
				const textContent = value?.replace(/<[^>]*>/g, '').trim();
				return textContent && textContent.length > 0;
			})
			.test('max-length', 'Máximo 500 caracteres', function (value) {
				const textContent = value?.replace(/<[^>]*>/g, '') || '';
				return textContent.length <= 500;
			}),
		imagen: Yup.string()
		// 	.required('Debés adjuntar una imágen'),
	});

	const triggerFileSelect = () => {
		fileInputRef.current?.click();
	};

	const handleFileSelect = (event, setFieldValue) => {
		const file = event.target.files[0];
		
		if (!file) return;
		
		// Validar tipo
		const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
		if (!allowedTypes.includes(file.type)) {
			alert('Tipo de archivo no permitido. Solo: JPG, PNG, GIF, PDF');
			return;
		}
		
		// Validar tamaño (15MB = 15 * 1024 * 1024 bytes)
		const maxSize = 15 * 1024 * 1024;
		if (file.size > maxSize) {
			alert('El archivo es muy grande. Máximo 15MB');
			return;
		}
		
		// Guardar archivo
		setSelectedFile(file);
		
		// Actualizar Formik con el nombre
		setFieldValue('imagen', file.name);
		
		// Crear/actualizar FormData
		const newFormData = new FormData();
		// Agregar la imagen
		newFormData.append('imagen', file);
		
		// Guardar FormData
		setFileFormData(newFormData);
		
		console.log('Archivo seleccionado:', file.name);
		console.log('FormData creado:', newFormData.get('imagen'));
	};

	const onSubmit = (values, { setSubmitting, resetForm }) => {
		

		console.log('Datos enviados:', values);

		console.log('FormData con imagen:', fileFormData);

		//creador_usuario_ldap
		//creacion_fecha
		//type
		//titulo_interno
		//titulo
		//desde
		//hasta
		//mensaje

		
		setTimeout(() => {
			alert('¡Formulario enviado con Formik!');
			setSubmitting(false);
			resetForm();
			
			// Limpiar estados de archivo
			setSelectedFile(null);
			setFileFormData(new FormData());
			
			}, 1000);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}>
			{({ values, setFieldValue, handleSubmit, isSubmitting }) => (
				<Form>
					<div className='bg-bg_primary flex flex-1 flex-col p-[16px] rounded-[12px] pt-[16px] gap-[16px]'>
						<div className='pb-[12px] border-b-[1px] border-tertiary'>
							<p className='text-primary texto_20_500'>
								Notificación de aumento
							</p>
						</div>

						{/* PRIMERA FILA MOVILE*/}
						<div className='flex items-end gap-[12px] '>
							{/** TÍTULO */}
							<div className='w-[100%] relative'>
								{/* <Input
								label='Título'
								placeholder='Ingresá...'
								name='titulo'
							/> */}

								<Field
									name='titulo'
									component={Input}
									label='Título'
									placeholder='Ingresá...'
								/>
								<ErrorMessage
									name='titulo'
									component='span'
									className='text-red-500 text-sm mt-1 absolute left-[12px]'
								/>
							</div>

							<SeparadorV
								height='60'
								separador='0'
							/>

							{/** ENVIAR */}
							<div className='flex flex-col relative'>
								<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
									Enviar:
								</label>

								<Field
									type='date'
									name='fechaEnviar'
									className='calendar-primary texto_16_500 text-secondary pl-[12px] pr-[12px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-[160px]'
								/>

								<ErrorMessage
									name='fechaEnviar'
									component='span'
									className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-23px]'
								/>
							</div>

							<SeparadorV
								height='0'
								separador='-6'
							/>

							{/** ARCHIVAR */}
							<div className='flex flex-col relative'>
								<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
									Archivar:
								</label>

								<Field
									type='date'
									name='fechaArchivar'
									className='calendar-primary texto_16_500 text-secondary pl-[12px] pr-[12px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-[160px]'
								/>

								<ErrorMessage
									name='fechaArchivar'
									component='span'
									className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-23px]'
								/>
							</div>

							<SeparadorV
								height='60'
								separador='0'
							/>

							{/* Switch 1 */}
							<div className='flex items-end gap-3 w-[40%] pb-[6px]'>
								<label className='texto_12_500 text-tertiary pb-[5px]'>
									¿Es push?
								</label>
								{/* 🔘 SWITCH BUTTON */}
								<button
									type='button'
									onClick={onToggle}
									//disabled={disabled}
									className={`
										relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none 
										${isOn ? 'bg-primary' : 'bg-gray-300'}
                            
                            		`}>
									{/* CÍRCULO QUE SE MUEVE CON TEXTO DENTRO */}
									<span
										className={`
											inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg text-xs font-bold
											${isOn ? 'translate-x-7 text-primary' : 'translate-x-1 text-gray-500'}
										`}>
										{isOn ? 'SÍ' : 'NO'}
									</span>
								</button>
							</div>
						</div>

						<div className='flex flex-col'></div>
						
						<SeparadorH separador='0' />

						{/** Segunda fila : Imagenes */}
						<div className='flex flex-col'>
							<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
								Imágen
							</label>

							<input
										type="file"
										ref={fileInputRef} // ← Necesitas crear este ref
										style={{ display: 'none' }}
										accept=".jpg,.jpeg,.png,.gif,.pdf"
										onChange={(event) => handleFileSelect(event, setFieldValue)}
									/>

							<div className='flex gap-2'>
								{/* INPUT */}
								<div className='relative w-full'>
									<Field
										type='text'
										placeholder={'Nombre de la imágen..'}
										value={selectedFile ? selectedFile.name : ''}
										readOnly
										name='imagen'
										className='texto_16_500 text-tertiary pl-[12px] pr-[40px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 cursor-default'
										onFocus={e => e.target.blur()} // ← Quita el focus inmediatamente
										style={{ caretColor: 'transparent' }} // ← Oculta el cursor de texto
									/>


									<ErrorMessage
										name='imagen'
										component='span'
										className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]'
									/>
								</div>

								{/* BOTÓN BUSCAR */}
								<ButtonPrimary texto='BUSCAR'  click={triggerFileSelect}  />
							</div>
						</div>

						<div className='flex flex-col'></div>

						<SeparadorH separador='0' />

						{/**  Tercera fila: Mensaje */}
						<div className='flex flex-col relative'>
							<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
								Contenido Comunicación
							</label>
							
							 

							<Field name='contenidoComunicacion'>
								{({ field, form }) => (
									<ReactQuill
										modules={{
											toolbar: [
												['bold', 'italic', 'underline'],
												[{ header: [1, 2, 3, false] }],
												[{ list: 'ordered' }, { list: 'bullet' }],
												['link'],
												[{ color: [] }], // ← Color de texto
												['clean'],
												 ['code-block'],
												
											],
										}}
										value={field.value}
										onChange={value => form.setFieldValue(field.name, value)}
										placeholder='Escribe el contenido...'
										className='bg-white texto_16_500 text-secondary pl-[12px] pr-[12px] pt-[12px] pb-[12px] rounded-[8px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 resize-none'
									/>
									
								)}

						
							</Field>

								

							<ErrorMessage
								name='contenidoComunicacion'
								component='span'
								className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-0px]'
							/>

							{/* CONTADOR DE CARACTERES */}

							<div className='flex justify-end mt-1 pr-[12px]'>
								<span className={`texto_12_500 text-tertiary`}>0/200</span>
							</div>

							{/* {maxLength && (
						<div className='flex justify-end mt-1 pr-[12px]'>
							<span
								className={`texto_11_400 ${charCount > maxLength * 0.9 ? 'text-red-500' : 'text-tertiary'}`}>
								{charCount}/{maxLength}
							</span>
						</div>
					)} */}
						</div>

						<SeparadorH separador='0' />
						<div className='flex justify-end'>
							{/* BOTÓN BUSCAR */}
							<ButtonPrimary
								texto='ENVIAR'
								type='submit'
							/>
							{isSubmitting && <p> Cargando </p>}
						</div>
						
					</div>
				</Form>
			)}
		</Formik>
	);
};
