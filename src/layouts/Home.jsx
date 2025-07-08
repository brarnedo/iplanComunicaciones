/* ----------------------------------------- componentes ---------------------------------------- */
import { Loader } from 'componentesUI';
import { useSetState } from 'hooks';
import Cookies from 'js-cookie';
/* -------------------------------------------- redux ------------------------------------------- */
import { useSelector } from 'react-redux';
/* ---------------------------------------- react router ---------------------------------------- */
import { Outlet, useNavigate } from 'react-router-dom';

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
			<nav className='flex h-auto w-full max-w-[1440px] flex-col items-center gap-4 bg-primary px-6 xl:h-[80px] xl:flex-row'>
                <div className='flex w-full flex-col items-center justify-between xl:flex-row'>

                    {/* btn logout */}
                    <div className='xl:order-0 order-1 flex items-center gap-4 xl:order-2'>
                        <span className='material-symbols-outlined text-white'>
                            local_police
                        </span>
                        <p className='texto_15_900 text-white'>
                            {user ? user : 'desarrollo local test'}
                        </p>
                        <button
                            className='pointer flex h-[36px] w-[36px] items-center justify-center rounded-full bg-bg_buttons'
                            onClick={() => logout()}
                            type='button'>
                            <span className='material-symbols-outlined text-white'>
                                power_settings_new
                            </span>
                        </button>
                    </div>
                </div>
			</nav>
			<div>
				<section>
					<button>page1</button>
					<button>page2</button>
					<button>page3</button>
				</section>
				<Outlet />
			</div>
		</>
	);
};
