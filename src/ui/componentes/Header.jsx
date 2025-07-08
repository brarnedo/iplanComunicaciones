
import iplan_logo from "assets/Iplan.png";
import {SeparadorV } from "componentesUI";


export const Header = () => {
	return (
		<header className='flex h-[75px] w-full max-w-[1440px] items-center justify-between bg-bg_primary px-6 md:px-4'>
			<div className='flex items-center'>
				<img
					alt='logo'
					
					src={iplan_logo}
				/>
				<SeparadorV height={'48'} />
				<h1 className='hidden md:flex text-tertiary  text-[30px] font-[300] font-lato'>
					COMUNICACIONES
				</h1>
			</div>
			
		</header>
	);
};
