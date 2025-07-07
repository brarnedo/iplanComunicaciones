import { ButtonWhite } from "../ui/componentes/ButtonWhite";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    let navigate = useNavigate();

    const ingresar= () => {

        navigate("/home");
    }
	return (
		<div className='bg-primary w-full py-[24px]'>
			<div className='w-[1360px] max-w-[1360px] mx-auto pl-[75px] flex items-center gap-[12px]'>
				<p className='text-white texto_16_500'> ACCEDER:</p>

                <div className="relative">
				<label className='texto_12_500 texto-white absolute left-[8px] top-[-15px] rounded-xl px-[1px] italic text-white'>
					Usuario
				</label>
				<input
					className='texto_16_500 h-3/4 text-tertiary focus:outline-none disabled:bg-disabled rounded-[8px] py-[8px] px-[12px]'
				/>
                </div>

                 <div className="relative">
				<label className='texto_12_500 texto-white absolute left-[8px] top-[-15px] rounded-xl px-[1px] italic text-white'>
					Clave
				</label>
				<input
					className='texto_16_500 h-3/4 text-tertiary focus:outline-none disabled:bg-disabled rounded-[8px] py-[8px] px-[12px]'
                     type="password"
				/>
                </div>

                <button
                onClick={ingresar}>
                    harcodeo
                </button>

                <ButtonWhite
                hover={false}
                texto={"INGRESAR"}
                type={"submit"}
                width={"123"}
              />
			</div>
		</div>
	);
};
