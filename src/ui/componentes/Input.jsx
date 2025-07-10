export const Input = ({
     field, form,
    label="",
    placeholder="",
    name="",
    ...props
}) => {
	return (
		<div className='flex flex-col '>
			<label className='texto_12_500 text-secondary pl-[12px]  px-[1px] '>
				{label}
			</label>
			<input className="texto_16_500 text-secondary placeholder:text-tertiary pl-[12px] rounded-[8px] h-[44px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none"
                placeholder={placeholder}
                name={name}
                 {...field}
            >
            
            </input>
		</div>
	);
};
