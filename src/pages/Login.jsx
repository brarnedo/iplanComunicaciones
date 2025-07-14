import { ButtonWhite, Loader } from 'componentesUI';
import { ErrorMessage, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'store';
import * as Yup from 'yup';
import homeComunicaciones from "assets/homeComunicaciones.png";
import Cookies from "js-cookie";


export const Login = () => {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoadingAuth, isAuthenticated, errorLogin } = useSelector(
		state => state.auth,
	);

	const [formValues, setFormValues] = useState({
		user: '',
		pass: '',
	});

	const handleSubmit = async values => {
		let respuesta = await dispatch(getAuth(values.user, values.pass));
		if (respuesta == 'OK') navigate('/home');
	};

	const handleChange = (setFieldValue, field, value) => {
		setFieldValue(field, value);
		setFormValues(prevValues => ({
			...prevValues,
			[field]: value,
		}));
	};

	useEffect(() => {
		//MODO DEV
        const cookieLogin = Cookies.get("LOGIN");
        if (isAuthenticated || cookieLogin) navigate("/home");
        
        //MODO PROD
		//if (isAuthenticated) navigate('/home');//prod
	}, [isAuthenticated]);

	return (
		<>  

		    <nav className='bg-primary'>
                <div className='flex h-auto w-full max-w-[1360px] mx-auto flex-col items-center gap-4  px-6 py-6 xl:h-[93px] xl:flex-row'>
                  
                    <p className='text-white texto_18_600'> ACCEDER:</p>
        
                    <Formik
                        initialValues={formValues}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            user: Yup.string().required('Usuario requerido'),
                            pass: Yup.string().required('Clave requerida'),
                        })}>
                        {({ isSubmitting, setFieldValue }) => (
                                <Form className='grid grid-cols-1 justify-items-center gap-4 xl:grid-cols-3 xl:items-end xl:justify-items-start xl:gap-0 xl:gap-x-4'>
                                    
                                    {/* input usuario */}
                                    <div
                                        className={`${isSubmitting ? 'bg-disabled' : 'bg-white'} relative flex h-[44px] w-[294px] items-center justify-start rounded-[6px] pl-4`}>
                                        <label className='texto_12_500 texto-white absolute left-[8px] top-[-18px] rounded-xl bg-primary px-[1px] italic text-white'>
                                            Usuario
                                        </label>

                                        <input
                                            className='texto_15_700 h-3/4 w-[99%] text-secondary focus:outline-none disabled:bg-disabled'
                                            disabled={isSubmitting}
                                            name='user'
                                            onChange={e =>
                                                handleChange(setFieldValue, 'user', e.target.value)
                                            }
                                            type='text'
                                            value={formValues.user}
                                        />

                                
                                        <ErrorMessage 
                                            name='user' 
                                            component='span' 
                                            className='text-white text-sm mt-1 absolute left-[12px] bottom-[-20px]' 
                                        />

                                    </div>
                                    
                                    {/* input password */}
                                    <div
                                        className={`${isSubmitting ? 'bg-disabled' : 'bg-white'} relative flex h-[44px] w-[294px] items-center justify-start rounded-[6px] pl-4`}>
                                        <label className='texto_12_500 texto-white absolute left-[8px] top-[-18px] rounded-xl bg-primary px-[1px] text-white'>
                                            Clave
                                        </label>
                                        <input
                                            className='texto-15_700 h-3/4 w-[99%] text-secondary focus:outline-none disabled:bg-disabled'
                                            disabled={isSubmitting}
                                            name='pass'
                                            onChange={e =>
                                                handleChange(setFieldValue, 'pass', e.target.value)
                                            }
                                            type='password'
                                            value={formValues.pass}
                                        />
                                    </div>
        
                                    {/* loader */}
                                    {isLoadingAuth ? (
                                        <Loader
                                            color='#B8B8B8'
                                            size='36'
                                        />
                                    ) : (
                                        <ButtonWhite
                                            hover={false}
                                            texto={'INGRESAR'}
                                            type={'submit'}
                                            width={'123'}
                                        />
                                    )}
        
                                    {/* errores */}
                                    {/* <div className='texto_11_700 text-center text-white'><ErrorMessage name='user' /></div>
                                    <div className='texto_11_700 text-center text-white'><ErrorMessage name='pass' /></div> */}
                                    {errorLogin && (<div className='texto_11_700 text-center text-white'>Error login</div>)}
                                </Form>
                            )}
                    </Formik>
                </div>

    		</nav>
    
            <section className="m-auto mt-12">
                <img alt="home comunicaciones" src={homeComunicaciones}/>
            </section>
		</>
	);
};
