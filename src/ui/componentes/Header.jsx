
import iplan_logo from "assets/Iplan.png";
import {SeparadorV } from "componentesUI";


export const Header = () => {
	return (
		<header className='flex h-[75px] w-full items-center justify-between bg-bg_primary'>
			<div className='flex items-center max-w-[1360px] w-[1360px] mx-auto'>
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
