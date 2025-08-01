import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getSaveComunicacion } from '../store/slices/saveComunicacion/thunks';
import { useSetState } from 'hooks';


import {
	ButtonPrimary,
	Input,
	Loader,
	SeparadorH,
	SeparadorV,
	Textarea
} from '../ui/componentes';

export { ButtonPrimary } from '../ui/componentes/ButtonPrimary';

import { useNavigate } from 'react-router-dom';

export const NuevaComunicacion = () => {
	const { seleccionada } = useSelector((state) => state.notificaciones);
	const [tipoComunicacion, setTipoComunicacion] = useState(seleccionada.tipo);
	const { setSeleccionada } = useSetState();

	const [btnVolverVisible, setBtnVolverVisible] = useState(true);

	const btnVolver = () => {
		setTipoComunicacion(0);
		setSeleccionada({ titulo: '', contenido: '', tipo: ''});
	};

	return (
		<div className='bg-white flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
			<div className='pb-[12px] border-b-[1px] border-secondary flex justify-between'>
				<p className='text-secondary texto_18_800'> Nueva comunicación </p>

				{(tipoComunicacion != 0 && btnVolverVisible) && (
					<span
						className='material-symbols-outlined text-white bg-primary p-[5px] rounded-[555px] cursor-pointer'
						onClick={btnVolver}>
						delete_forever
					</span>
				)}
			</div>

			{tipoComunicacion == 0 && (
				<div className='bg-bg_primary flex flex-1 flex-col p-[16px] rounded-[12px] pt-[33px]'>
					<div className='flex gap-[24px]'>
						<div className='relative'>
							<label className='texto_12_500 text-secondary absolute left-[8px] top-[-18px] rounded-xl px-[1px] '>
								Tipo de comunicación
							</label>
							<select
								className={`texto_16_500 text-tertiary focus:outline-none disabled:bg-disabled rounded-[8px] py-[8px] px-[12px] xl:w-[400px] border border-tertiary ${
									tipoComunicacion === '0' ? 'text-gray-400' : 'text-tertiary'
								}`}
								value={tipoComunicacion}
								onChange={e => setTipoComunicacion(e.target.value)}>
								<option
									value='0'
									disabled>
									Seleccionar...
								</option>{' '}
								{/* ← disabled para que no se pueda volver a seleccionar */}
								<option value='aumento'>Notificación de aumento</option>
								{/* <option value='masivo'>Evento Masivo</option> */}
								<option value='general'>Comunicación General</option>
							</select>
						</div>

						{/* <ButtonPrimary texto='CONFIGURAR' /> */}
					</div>
				</div>
			)}

			{/** Fomulario Aumento  */}
			{tipoComunicacion != 0 && <FormularioGeneral tipoComunicacion={tipoComunicacion} setTipoComunicacion={setTipoComunicacion} setBtnVolverVisible={setBtnVolverVisible}/>}
		</div>
	);
};

const FormularioGeneral = ({ tipoComunicacion = "NO LLEGO", setTipoComunicacion, setBtnVolverVisible}) => {
	const { user = '' } = useSelector(state => state.auth);
	const { seleccionada } = useSelector((state) => state.notificaciones);

	if(tipoComunicacion == "masivo") return (
		<div className='bg-bg_primary p-[8px] flex items-center justify-center rounded-[12px] gap-[8px]'>
			<p className='text-secondary texto_20_600'> AÚN NO DISPONIBLE </p>
		</div>
	)

	const [previewComunicacion, setPreviewComunicacion] = useState(false);

	const [isOn, setIsOn] = useState(0);//0 no push - 1 push
	

	const [charCount, setCharCount] = useState(0);
	const maxLength = 900;


	const [charCountTituloInterno, setCharCountTituloInterno] = useState(0);
	const maxLengthTituloInterno = 45;

	const [charCountTitulo, setCharCountTitulo] = useState(0);
	const maxLengthTitulo = 45;

	const [charCountMensajePush, setCharCountMensajePush] = useState(0);
	const maxLengthMensajePush = 120;


	const getPlainText = (html) => {
		if (!html) return '';
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		return doc.body.textContent || doc.body.innerText || '';
	};

	const onToggle = () => {
		if (isOn) {
			setIsOn(0);
		} else {
			//input = getTodayDate();
			setIsOn(1);
		}
	};

	const getTodayDate = () => {
		const today = new Date();
		return today.toISOString().split('T')[0];
	};

	// 🎯 VALORES INICIALES (como initialValues en Formik)
	const initialValues = {
		tituloInterno:'',
		titulo: seleccionada.titulo ? seleccionada.titulo : '',
		fechaEnviar:getTodayDate(),
		fechaArchivar: '',
		contenidoComunicacion: seleccionada.msj ? seleccionada.msj : '',
		listadoDistribuccion:'',
		listadoServicio:'',
		imagen: '',
		mensajePush: '',
	};

	const validationSchema = Yup.object({
		tituloInterno: Yup.string()
			.min(2, 'Mínimo 2 caracteres')
			.max(45, 'Máximo 45 caracteres')
			.required('Ingresá un título interno'),			
		titulo: Yup.string()
			.min(2, 'Mínimo 2 caracteres')
			.max(45, 'Máximo 45 caracteres')
			.required('Ingresá un título'),
		fechaEnviar: Yup.date()
			.min(new Date(new Date().setHours(0, 0, 0, 0)), 'Fecha inválida')
			.required('Fecha requerida'),
		fechaArchivar: Yup.date()
			.min(new Date(new Date().setHours(0, 0, 0, 0)), 'Fecha inválida')
			.test(
				'fecha-posterior',
				'Fecha inválida',
				function(value) {
					const { fechaEnviar } = this.parent;
					if (!fechaEnviar || !value) return true; // Si alguna está vacía, no validar esta condición
					
					// Convertir a fecha sin hora para comparar solo fechas
					const fechaDesde = new Date(fechaEnviar);
					const fechaHasta = new Date(value);
					
					fechaDesde.setHours(0, 0, 0, 0);
					fechaHasta.setHours(0, 0, 0, 0);
					
					return fechaHasta >= fechaDesde; // Mayor o IGUAL
            	}
			)
			.required('Ingresá una fecha'),
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
		//listadoDistribuccion: Yup.string().required('Debés adjuntar un archivo'),
		imagen: Yup.mixed()
			.test('fileType', 'Tipo de archivo no permitido', function(value) {
				if (!selectedFile) return true; // Si no hay archivo, no validar aquí
				const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
				return allowedTypes.includes(selectedFile.type);
			})
			.test('fileSize', 'Archivo muy grande. Máximo 15MB', function(value) {
				if (!selectedFile) return true;
				return selectedFile.size <= 15 * 1024 * 1024;
			}),
		// 	.required('Debés adjuntar una imágen'),
		listadoDistribuccion: Yup.string().required('Debés adjuntar un archivo'),
		listadoServicio:Yup.string()
		 .test('conditional-required', 'Debés adjuntar un archivo', function (value) {
			// Solo es requerido si tipoComunicacion ES "aumento"
			if (tipoComunicacion === "aumento") {
			return value && value.length > 0;
			}
			return true; // Si NO es "aumento", siempre válido (porque el campo no existe)
		}),
		    mensajePush: Yup.string()
        .test('conditional-validation', 'Ingresá un contenido', function (value) {
            // Solo validar si isOn es true
            if (isOn) {
                // Si está visible, aplicar todas las validaciones
                if (!value || value.length < 2) {
                    return this.createError({ message: 'Mínimo 2 caracteres' });
                }
                if (value.length > 120) {
                    return this.createError({ message: 'Máximo 120 caracteres' });
                }
                return true;
            }
            // Si isOn es false, siempre es válido
            return true;
        })

		
	});

	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);
	const [errorImagen, setErrorImagen] = useState ("");
	const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

	// Limpiar URL cuando se desmonte el componente:
	useEffect(() => {
		return () => {
			if (imagePreviewUrl) {
				URL.revokeObjectURL(imagePreviewUrl);
			}
		};
	}, [imagePreviewUrl]);

	const triggerFileSelect = () => {	
		fileInputRef.current?.click();
	};

	const handleFileSelect = (event, setFieldValue) => {
		const file = event.target.files[0];
		
		if (!file) return;

		 // Limpiar errores y URL previa
		//setFieldError('imagen', '');
		if (imagePreviewUrl) {
			URL.revokeObjectURL(imagePreviewUrl);  // ← Limpiar URL anterior
		}
		
		// Validar tipo
		const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
		if (!allowedTypes.includes(file.type)) {
			setErrorImagen("Tipo de archivo no permitido. Solo: JPG, PNG, GIF, PDF");
			setSelectedFile("");
			return;
		}
		
		// Validar tamaño (15MB = 15 * 1024 * 1024 bytes)
		const maxSize = 15 * 1024 * 1024;
		if (file.size > maxSize) {
			setErrorImagen("El archivo es muy grande. Máximo 15MB");
			setSelectedFile("");
			return;
		}
		
		// Guardar archivo
		setSelectedFile(file);

		// Solo crear preview si es imagen
        if (file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreviewUrl(imageUrl);
        } else {
            setImagePreviewUrl(null);  // PDFs no se muestran como imagen
        }
		
		// Actualizar Formik con el nombre
		setFieldValue('imagen', file.name);

		setErrorImagen("");
	};

	const eliminarImagen = () => {
		setSelectedFile("");
		  // Limpiar también el valor del input file
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	}


	/** LISTA DE DISTRIBUCCIÓN */
	const [selectedListaDistribuccion, setSelectedListaDistribuccion] = useState(null);
	const listaDistribuccionInputRef = useRef(null);
	const [errorListaDistribuccion, setErrorListaDistribuccion] = useState ("");
	const [listaDistribuccionPreviewUrl, setListaDistribuccionPreviewUrl] = useState(null);

	// Limpiar URL cuando se desmonte el componente:
	useEffect(() => {
		return () => {
			if (listaDistribuccionPreviewUrl) {
				URL.revokeObjectURL(listaDistribuccionPreviewUrl);
			}
		};
	}, [listaDistribuccionPreviewUrl]);


	const triggerListaDistribuccion = () => {
		listaDistribuccionInputRef.current?.click();
	};

	const handleListaDistribuccion = (event, setFieldValue) => {
		const file = event.target.files[0];
		
		if (!file) return;

		 // Limpiar errores y URL previa
		//setFieldError('imagen', '');
		if (listaDistribuccionPreviewUrl) {
			URL.revokeObjectURL(listaDistribuccionPreviewUrl);  // ← Limpiar URL anterior
		}
		// Validar tipo
		// Validar que sea CSV
		if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
			setErrorListaDistribuccion("Tipo de archivo no permitido. Solo: CSV");
			setSelectedListaDistribuccion("");
			return;
		}
		
		// Validar tamaño (15MB = 15 * 1024 * 1024 bytes)
		const maxSize = 15 * 1024 * 1024;
		if (file.size > maxSize) {
			setErrorListaDistribuccion("El archivo es muy grande. Máximo 1000MB");
			setSelectedListaDistribuccion("");
			return;
		}
		
		// Guardar archivo
		setSelectedListaDistribuccion(file);
		
        const imageUrl = URL.createObjectURL(file);
        setListaDistribuccionPreviewUrl(imageUrl);
     
		// Actualizar Formik con el nombre
		setFieldValue('listadoDistribuccion', file.name);

		setErrorListaDistribuccion("");
	};
	
	/** LISTA DE SERVICIO */

	const [selectedListaServicio, setSelectedListaServicio] = useState(null);
	const listaServicioInputRef = useRef(null);
	const [errorListaServicio, setErrorListaServicio] = useState ("");
	const [listaServicioPreviewUrl, setListaServicioPreviewUrl] = useState(null);

	// Limpiar URL cuando se desmonte el componente:
	useEffect(() => {
		return () => {
			if (setListaServicioPreviewUrl) {
				URL.revokeObjectURL(setListaServicioPreviewUrl);
			}
		};
	}, [setListaServicioPreviewUrl]);
	

	const triggerListaServicio = () => {
		
		listaServicioInputRef.current?.click();
	};

	const handleListaServicio = (event, setFieldValue) => {
		
		const file = event.target.files[0];
		
		if (!file) return;

		 // Limpiar errores y URL previa
		//setFieldError('imagen', '');
		if (listaServicioPreviewUrl) {
			URL.revokeObjectURL(listaServicioPreviewUrl);  // ← Limpiar URL anterior
		}
		
		// Validar tipo

		// Validar que sea CSV
		if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
			setErrorListaServicio("Tipo de archivo no permitido. Solo: CSV");
			setSelectedListaServicio("");
			return;
		}

		
		// Validar tamaño (15MB = 15 * 1024 * 1024 bytes)
		const maxSize = 15 * 1024 * 1024;
		if (file.size > maxSize) {
			setErrorListaServicio("El archivo es muy grande. Máximo 1000MB");
			setSelectedListaServicio("");
			return;
		}
		
		// Guardar archivo
		setSelectedListaServicio(file);

		// Solo crear preview si es imagen
        //if (file.type.startsWith('csv/')) {
            const imageUrl = URL.createObjectURL(file);
            setListaServicioPreviewUrl(imageUrl);
        //} else {
          //  setListaDistribuccionPreviewUrl(null);  // PDFs no se muestran como imagen
        //}
		
		// Actualizar Formik con el nombre
		setFieldValue('listadoServicio', file.name);

		setErrorListaServicio("");

	};

	const onSubmit = async (values, { setSubmitting, resetForm }) => {
		setPreviewComunicacion(true);
	};
		
	
	return (		
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}>
			{({ values, setFieldValue, handleSubmit, isSubmitting }) => (

				
				<Form>
					{!previewComunicacion ? (
						<div className='bg-bg_primary flex flex-1 flex-col p-[16px] rounded-[12px] pt-[16px] gap-[16px]'>

							<div className='pb-[12px] border-b-[1px] border-tertiary'>
								<p className='text-primary texto_20_500'>
									{tipoComunicacion == "general" ?"Comunicación general":"Comunicación de aumento"}
									
								</p>
							</div>

							{/* TITULO INTERNO */}										
							<div className='flex items-end gap-[12px]'>
								
								<div className='w-[100%] relative'>
								
									<Field name='tituloInterno'>
										{({ field, form }) => (
											<Input
												field={field}
												label='Nombre Interno'
												placeholder='Ingresá...'
												onChange={(e) => {
													const textLength = e.target.value.length;
													setCharCountTituloInterno(textLength);
													form.setFieldValue(field.name, e.target.value);
												}}
											/>
										)}
									</Field>

									
										<ErrorMessage
											name='tituloInterno'
											component='span'
											className='text-red-500 text-sm absolute'
										/>

									<div className='flex justify-end pr-[8px] pt-[4px] items-end  w-full absolute'>
										<span className={`texto_12_500 ${
											charCountTituloInterno > maxLengthTituloInterno ? 'text-red-500' : 'text-tertiary'
										}`}>
											{charCountTituloInterno}/{maxLengthTituloInterno}
										</span>
									</div>


								</div>

								{/* PUSH */}
								{
									tipoComunicacion == "general" && 
									(<>
										<SeparadorV
											height='60'
											separador='0'
										/>

										<div className='flex justify-center items-center gap-4 w-[20%] pb-[6px]'>
											<label className='texto_12_500 text-tertiary '>
												¿Es push?
											</label>
											{/* 🔘 SWITCH BUTTON */}
											<button
												type='button'
												onClick={onToggle}
												//disabled={disabled}
												className={`
													relative inline-flex h-8 w-[58px] items-center rounded-full transition-colors duration-300 focus:outline-none 
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
									</>)
								}
							</div>

							<div className='flex flex-col'></div>
							
							<SeparadorH separador='0' />

							{/* TITULO / PUSH / ENVIAR / ARCHIVAR */}
							<div className='flex flex-col xl:flex-row items-center xl:items-end gap-[12px] '>

								{/** TÍTULO */}
								<div className='w-[100%] relative'>	

									<Field name='titulo'>
										{({ field, form }) => (
											<Input
												field={field}
												label='Título comunicación'
												placeholder='Ingresá...'
												onChange={(e) => {
													const textLength = e.target.value.length;
													setCharCountTitulo(textLength);
													form.setFieldValue(field.name, e.target.value);
												}}
											/>
										)}
									</Field>

									
									<ErrorMessage
										name='titulo'
										component='span'
										className='text-red-500 text-sm absolute left-[12px]'
									/>

									<div className='flex justify-end pr-[8px] pt-[4px] items-end absolute w-full'>
										<span className={`texto_12_500 ${
											charCountTitulo > maxLengthTitulo ? 'text-red-500' : 'text-tertiary'
										}`}>
											{charCountTitulo}/{maxLengthTitulo}
										</span>
									</div>
								</div>

								<SeparadorV
									height='60'
									separador='0'
								/>
																
								<SeparadorV
									height='0'
									separador='-6'
								/>

								{/** DESDE */}
								<div className='relative w-full xl:w-auto'>

									<div className='flex flex-col '>
										<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
											Desde:
										</label>

										<Field
											type='date'
											name='fechaEnviar'
											className='calendar-primary texto_16_500 text-secondary pl-[12px] pr-[12px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full xl:w-[160px]'
											disabled={isOn ? true : false}
											value={isOn ? getTodayDate() : values.fechaEnviar}
										/>
									</div>

									<ErrorMessage
										name='fechaEnviar'
										component='span'
										className='text-red-500 text-sm  absolute left-[12px]'
									/>

								</div>

								

								
								{/** HASTA */}
								<div className='relative w-full xl:w-auto'>
									<div className='flex flex-col'>
										
										<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
											Hasta:
										</label>

										<Field
											type='date'
											name='fechaArchivar'
											className='calendar-primary texto_16_500 text-secondary pl-[12px] pr-[12px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full xl:w-[160px]'
										/>

									</div>

									<ErrorMessage
											name='fechaArchivar'
											component='span'
											className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-23px]'
										/>
								</div>

								

							</div>

							<div className='flex flex-col xl:flex-row'></div>
							
							

							{/* IMAGEN */}
							<div className='flex flex-col'>

								<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
									Imagen
								</label>

								<input
									type="file"
									ref={fileInputRef} // ← Necesitas crear este ref
									style={{ display: 'none' }}
									accept=".jpg,.jpeg,.png,.gif,.pdf"
									onChange={(event) => handleFileSelect(event, setFieldValue, )}
								/>

								<div className='flex flex-col xl:flex-row gap-2'>
									{/* INPUT */}
									<div className='relative w-full'>
										<Field
											type='text'
											placeholder={'Subir imagen..'}
											value={selectedFile ? selectedFile.name : ''}
											readOnly
											name='imagen'
											className='texto_16_500 text-tertiary pl-[12px] pr-[40px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 cursor-default'
											onFocus={e => e.target.blur()} // ← Quita el focus inmediatamente
											style={{ caretColor: 'transparent' }} // ← Oculta el cursor de texto
										/>

										<span className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]' >{errorImagen}</span>
										<ErrorMessage
											name='imagen'
											component='span'
											className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]'
										/>
									</div>

									{/* BOTÓN BUSCAR */}
									{ selectedFile && (
										<>
										<button
											className='pointer flex h-[44px] w-[55px] items-center justify-center rounded-full bg-primary'
											onClick={()=>{eliminarImagen()}}
											type='button'>
												
											<span className='material-symbols-outlined text-white'>
												close
											</span>
										</button>

											<SeparadorV
											height='40'
											separador='0'
										/>
										</>
											)
										
									}
									

									<ButtonPrimary texto={selectedFile?'REEMPLAZAR':'BUSCAR'}  click={triggerFileSelect}  />

								
								</div>
							</div>

							<div className='flex flex-col'></div>

						

							{/**  MENSAJE */}
							<div className='flex flex-col relative'>

								<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
									Contenido comunicación
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
											placeholder='Escribí el contenido...'
											className='bg-white texto_16_500 pl-[12px] pr-[12px] pt-[12px] pb-[12px] rounded-[8px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 resize-none'
											
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

									<span className={`texto_12_500 ${
										charCount > maxLength ? 'text-red-500' : 'text-tertiary'
									}`}>
										{charCount}/{maxLength}
									</span>
								</div>
							</div>
							
							

							{isOn ? (<>
								<div className='flex items-end gap-[12px]'>
									<div className='w-[100%] relative'>
										
									
										<Field name='mensajePush'>
											{({ field, form }) => (
												<Textarea
													field={field}
													label='Contenido comunicación push'
													placeholder='Ingresá...'
													rows={2} // ← 2 líneas
													onChange={(e) => {
														const textLength = e.target.value.length;
														setCharCountMensajePush(textLength);
														form.setFieldValue(field.name, e.target.value);
													}}
												/>
											)}
										</Field>

										<ErrorMessage
											name='mensajePush'
											component='span'
											className='text-red-500 text-sm absolute left-[12px]'
										/>

											
										<div className='flex justify-end pr-[8px] pt-[4px] items-end  w-full'>
											<span className={`texto_12_500 ${
												charCountMensajePush > maxLengthMensajePush ? 'text-red-500' : 'text-tertiary'
											}`}>
												{charCountMensajePush}/{maxLengthMensajePush}
											</span>
										</div>

									</div>
								</div>
								<div className='flex flex-col'></div>
							</> ) : ''}
							
							<SeparadorH separador='0' />

							{/** ARCHIVO DE DISTRIBUCCIÓN */}
							<div className='flex flex-col'>
								<label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
									Lista de distribución
								</label>
								<input
											type="file"
											ref={listaDistribuccionInputRef} // ← Necesitas crear este ref
											style={{ display: 'none' }}
											accept=".csv"
											onChange={(event) => handleListaDistribuccion(event, setFieldValue)}
								/>

								<div className='flex flex-col xl:flex-row gap-2'>
									{/* INPUT */}
									<div className='relative w-full'>
										<Field
											type='text'
											placeholder={'Subir archivo..'}
											readOnly
											name='listadoDistribuccion'
											className='texto_16_500 text-tertiary pl-[12px] pr-[40px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 cursor-default'
											onFocus={e => e.target.blur()} // ← Quita el focus inmediatamente
											style={{ caretColor: 'transparent' }} // ← Oculta el cursor de texto
										/>
										<span className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]' >{errorListaDistribuccion}</span>
										<ErrorMessage
											name='listadoDistribuccion'
											component='span'
											className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]'
										/>
									</div>

									{/* BOTÓN BUSCAR */}
									<ButtonPrimary texto= {values.listadoDistribuccion == ""?'BUSCAR':"REEMPLAZAR"}  click={triggerListaDistribuccion}  />
								</div>
							</div>
							
							{/** ARCHIVO DE SERVICIO */}
							{ tipoComunicacion == "aumento" && (
								<>
									<div className='flex flex-col'></div>
									{/** ARCHIVO DE DISTRIBUCCIÓN */}
									<div className='flex flex-col'>
										<label className={`texto_12_500 pl-[12px] px-[1px] ${
              								  values.listadoServicio === "" ? 'text-secondary' : 'text-secondary'
          								  }`}>
											Lista de servicios afectados
										</label>
										<input
													type="file"
													ref={listaServicioInputRef} // ← Necesitas crear este ref
													style={{ display: 'none' }}
													accept=".csv"
													onChange={(event) => handleListaServicio(event, setFieldValue)}
										/>

										<div className='flex flex-col xl:flex-row gap-2'>
											{/* INPUT */}
											<div className='relative w-full'>
												<Field
													type='text'
													placeholder={'Subir archivo..'}
													readOnly
													name='listadoServicio'
													className='texto_16_500 text-tertiary pl-[12px] pr-[40px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none w-full placeholder:text-tertiary placeholder:opacity-70 cursor-default'
													onFocus={e => e.target.blur()} // ← Quita el focus inmediatamente
													style={{ caretColor: 'transparent' }} // ← Oculta el cursor de texto
												/>
												<span className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]' >{errorListaServicio}</span>
												<ErrorMessage
													name='listadoServicio'
													component='span'
													className='text-red-500 text-sm mt-1 absolute left-[12px] bottom-[-20px]'
												/>
											</div>

											{/* BOTÓN BUSCAR */}
											<ButtonPrimary texto={values.listadoServicio == "" ?'BUSCAR':'REEMPLAZAR'}  click={triggerListaServicio}  />
										</div>
									</div>
								</>
								)
							}

							<div className='flex flex-col'></div>
							<SeparadorH separador='0' />

							{/** BOTON SUMMIT */}
							<div className='flex justify-end'>
								{/* BOTÓN BUSCAR */}
								<ButtonPrimary
									texto='RESUMEN'
									type='submit'
								/>
							
							</div>
							
						</div>
					)
					:(

						// COMPONENTE PREVIEW
						<PreviewComunicacion 
							tipo = {tipoComunicacion}
							fechaIni={values.fechaEnviar || 'Sin fecha'}
							fechaFin={values.fechaArchivar || 'Sin fecha'}
							nombre={user || 'Sin nombre'}
							titulo={values.titulo || 'Sin título'}
							tituloInterno = {values.tituloInterno }
							msj={values.contenidoComunicacion || 'Sin contenido'}
							esPush={isOn}
							img={selectedFile ? selectedFile.name : 'Sin imagen'}
							selectedFile={selectedFile || ''}        // ← El archivo completo para FormData
    						imagePreviewUrl={imagePreviewUrl || ''}  // ← La URL para mostrar
							lista1 = {selectedListaDistribuccion.name}
							selectedListaDistribuccion={selectedListaDistribuccion}        // ← El archivo completo para FormData
    						listaDistribuccionPreviewUrl={listaDistribuccionPreviewUrl}  // ← La URL para mostrar
							lista2 = {selectedListaServicio?.name || ''}
							selectedListaServicio={selectedListaServicio?selectedListaServicio:''}        // ← El archivo completo para FormData
    						listaServicioPreviewUrl={listaServicioPreviewUrl?listaServicioPreviewUrl:''} 
							formulario = {setPreviewComunicacion} // ← La URL para mostrar
							setTipoComunicacion = {setTipoComunicacion}
							msjPush={values.mensajePush}
							setBtnVolverVisible={setBtnVolverVisible}
						/>
					)}
				</Form>
			)}

		</Formik>
	);
};

export const PreviewComunicacion = ({
	tipo = "",
	fechaIni = "",
	fechaFin = "",
	nombre = "",//usuario falta agregar
	titulo = "",
	tituloInterno = "",
	msj = "",
	esPush = "",
	selectedFileName = null,//img name
	selectedFile = null,
    imagePreviewUrl = null,
	lista1 = "",//name
	selectedListaDistribuccion = null,      // ← El archivo completo para FormData
    listaDistribuccionPreviewUrl = null,  // ← La URL para m
	lista2 = "",
	selectedListaServicio = null,      // ← El archivo completo para FormData
    listaServicioPreviewUrl = null,  // ← La URL para m
	formulario,
	setTipoComunicacion,
	msjPush = "",
	setBtnVolverVisible,
}) => {
	const dispatch = useDispatch();

	const [statusRespuesta, setStatusRespuesta]=useState(null);
	const [mensajeRespuesta, setMensajeRespuesta]=useState("");

	const { isLoadingSaveComunicacion, saveComunicacion } = useSelector(state => state.saveComunicacion);
	
	const renderFilePreview = () => {
		if (!selectedFile) return null;
		
		// Si es imagen, mostrar preview
		if (selectedFile.type.startsWith('image/') && imagePreviewUrl) {
			return (
				<>
				<div>
					<img
						alt='Vista previa de imagen'
						src={imagePreviewUrl}
					/>
				</div>
				</>
			);
		}
			// Si es PDF u otro archivo, mostrar info
		return (
			<div className="bg-gray-100 border border-gray-300 rounded-[8px] p-4 my-4 flex items-center gap-3">
				<span className="material-symbols-outlined text-gray-600">
					{selectedFile.type === 'application/pdf' ? 'picture_as_pdf' : 'attach_file'}
				</span>
				<div>
					<p className="texto_14_600 text-gray-800">{selectedFile.name}</p>
					<p className="texto_12_400 text-gray-600">
						{(selectedFile.size / 1024 / 1024).toFixed(2)} MB
					</p>
				</div>
			</div>
		);
	}

	
	const enviarCominicacion = async () => {

		// Crear FormData completo al momento del envío
		const completeFormData = new FormData();
		
		// Agregar TODOS los datos del formulario
		completeFormData.append('titulo_interno', tituloInterno);
		completeFormData.append('titulo', tituloInterno);
		completeFormData.append('desde', fechaIni);
		completeFormData.append('hasta', fechaFin);
		completeFormData.append('mensaje', msj);
		completeFormData.append('mensajePush', esPush ? msjPush : null);
		completeFormData.append('type', tipo);
		
		if (selectedListaDistribuccion) {
			completeFormData.append('fileData', selectedListaDistribuccion);
		}

		// Agregar archivo si existe
		if (selectedListaServicio) {
			completeFormData.append('fileText', selectedListaServicio);
		}

		if (selectedFile) {
			completeFormData.append('imagenData', selectedFile);
		}
		// completeFormData.append('is_push', esPush);

		
		// DEBUG
		// console.log('=== FORMDATA COMPLETO ===');
		// for (let [key, value] of completeFormData) {
		// 	console.log(key, ':', value);
		// }
		
			setBtnVolverVisible(false);

		const respuesta = await dispatch(getSaveComunicacion(completeFormData));

		

		if(respuesta.status == "OK"){
			setStatusRespuesta("OK");
			setMensajeRespuesta(respuesta.data);

		}else{
			setStatusRespuesta("ERROR");
			setMensajeRespuesta(respuesta.data)
		}
    	
	}

	const modificarComunicacion = () => {
		formulario(false);
	}


	return (
		<>

		{statusRespuesta == null
		?
		
			<div>

				<div className='pb-[8px]  mb-[8px]'>
					<p className='text-primary texto_20_500'>
						Resumen: {tipo == "general" ?"Comunicación General":"Comunicación de aumento"}
					</p>
				</div>
				
				<div className='bg-bg_primary p-[16px] rounded-[12px]'>
					{/* 			
					<div className='texto_14_500 text-bg_secondary'>{tipo == "general"?'Cominicación general': 'Comunicación de aumento	'}</div> */}

					<div className='flex items-center justify-between w-full'>
						<div className='flex items-center gap-2 text-bg_secondary'>
							<p className='text-secondary texto_16_800'>{fechaIni}</p> |
							<p className='text-secondary texto_16_800'>{fechaFin}</p> |
							<p className='flex items-center gap-3 text-tertiary texto_16_600'>
								<span className='material-symbols-outlined'>id_card</span> {nombre}
							</p>
						</div>
						
					</div>

					<div className='flex flex-col mt-4 gap-[8px] rounded-[8px]'>

						<h2 className='texto_16_800 text-subtitle'>{titulo}</h2>
						
						{/* PREVIEW DEL ARCHIVO */}
						{renderFilePreview()}
						
						<div 
							className='texto_14_500 text-tertiary'
							dangerouslySetInnerHTML={{ __html: msj }}
						/>
					</div>
				</div>

				{lista1 && 
					<div className='flex items-center justify-between  mt-3'>
						<div className='text-tertiary'>
							<p className='texto_14_500'>Lista de distribución</p>
							<p className='texto_16_500'>{lista1}</p>
						</div>
						<a href={listaDistribuccionPreviewUrl}> 
							<div className='w-[34px] h-[34px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'>
								<span className='material-symbols-outlined'>arrow_circle_down</span> 
							</div>
						</a>
						
					</div>
				}
				
				{lista2 && <>
					<SeparadorH separador='8' />
					<div className='flex items-center justify-between mt-3'>
						<div className='text-tertiary '>
							<p className='texto_14_500'>Lista de servicios afectados</p>
							<p className='texto_16_500'>{lista2}</p>
						</div>
						<a href={listaServicioPreviewUrl}> 
							<div className='w-[34px] h-[34px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-bg_secondary cursor-pointer'>
								<span className='material-symbols-outlined'>arrow_circle_down</span> 
							</div>
						</a>
					</div>
					</>
				}
			
				<div className='flex flex-col'></div>
				<SeparadorH separador='8' />

				{isLoadingSaveComunicacion 
					
					?<>
					
						<div className='bg-tertiary p-[8px] flex items-center justify-center rounded-[12px] gap-[8px]'>
								<Loader color="white" size="34"/>
								<p className='text-white texto_20_600'> Enviando comunicación, esperá por favor... </p>

						</div>
					</>
					:<>
						<div className='flex flex-col lg:flex-row mt-[16px] justify-between gap-[8px]'>
							{/* BOTÓN BUSCAR */}
							<ButtonPrimary texto='EDITAR' click={modificarComunicacion}/>
							<ButtonPrimary texto='ENVIAR COMUNICACIÓN' click={enviarCominicacion}/>
						</div>
						</>
				}

		
			</div>

		: statusRespuesta == "OK" 

			?
			<>
				<div className='flex items-center justify-center p-[8px] rounded-[12px] bg-[#6FDD58] gap-[8px]'>
					<span className='material-symbols-outlined text-white'>sentiment_satisfied</span> 
					<p className='text-white texto_20_600'> {mensajeRespuesta} </p>
				</div>
				<div className='flex flex-col lg:flex-row mt-[16px] justify-end gap-[8px]'>
					<ButtonPrimary 
					texto='TERMINAR' 
					click={() => {setTipoComunicacion(0)}}
					/>
				</div>
			</>

			:
			<><div className='flex items-center justify-center p-[8px] rounded-[12px] bg-[#FF8661] gap-[8px]'>
				<span className='material-symbols-outlined text-white'>sentiment_sad</span> 
				<p className='text-white texto_20_600'> Lo sentimos, no se pudo enviar la comunicación </p>
				
			</div>

				<div className='flex flex-col lg:flex-row mt-[16px] justify-end gap-[8px]'>
					<ButtonPrimary 
					texto='TERMINAR' 
					click={() => {setTipoComunicacion(0)}}
					/>
				</div>
			</>
		}
		</>
	);
};
