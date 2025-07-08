import { Outlet, Link } from "react-router-dom";
/* ----------------------------------------- componentes ---------------------------------------- */
import { Loader } from 'componentesUI';
import { useSetState } from 'hooks';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
	let navigate = useNavigate();
	
	const { user = '' } = useSelector(state => state.auth);
	const { setIsAuthenticated } = useSetState();
	const logout = () => {
		Cookies.remove('LOGIN');
		Cookies.remove('PHPSESSID');
		setIsAuthenticated(false);
		navigate('/');
	};
	return (
        <>
         <div className="flex flex-col flex-1">
		<nav className='w-full bg-primary'>
			<div className='w-[1360px] max-w-[1360px] mx-auto h-[84px] flex items-center justify-end pr-[25px] gap-[12px]'>
				<span className='material-symbols-outlined text-white'>badge</span>

				<p className='texto_15_900 text-white'>
					{user ? user : 'desarrollo local'}
				</p>

				<div className='bg-white h-[34px] w-[1px] md:flex'></div>

				<button
					className='pointer flex h-[36px] w-[36px] items-center justify-center rounded-full bg-bg_buttons'
					onClick={() => logout()}
					type='button'>
					<span className='material-symbols-outlined text-white'>
						power_settings_new
					</span>
				</button>
			</div>
		</nav>
        
        <div className='w-full bg-bg_primary flex  flex-1'>

			<div className='w-[1360px] max-w-[1360px] mx-auto  flex flex-1 items-start gap-[24px] pt-[24px]'>
                
                <div className="w-[284px] flex flex-col gap-[12px] pt-[19px]">

                     {/* 🔗 ENLACES DE NAVEGACIÓN */}
                    <Link to="/home" className="texto_16_600 text-secondary cursor-pointer hover:opacity-80">
                        CARGAR COMUNICACIÓN
                    </Link>
                    <div className="bg-bg_secondary h-[1px] w-full"></div>
                    
                    <Link to="/programadas" className="texto_16_500 text-tertiary cursor-pointer hover:opacity-80">
                        COMUNICACIÓN PROGRAMADAS
                    </Link>
                    <div className="bg-bg_secondary h-[1px] w-full"></div>
                    
                    <Link to="/archivadas" className="texto_16_500 text-tertiary cursor-pointer hover:opacity-80">
                        ARCHIVOS DE COMUNICACIONES
                    </Link>
 
                </div>

                <Outlet /> 

            </div>
        </div>
        
</div>

        </>
	
    )
}

