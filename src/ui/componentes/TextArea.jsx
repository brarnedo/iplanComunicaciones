export const Textarea = ({
    field, 
    form,
    label = "",
    placeholder = "",
    onChange,
    rows = 2,
    ...props
}) => {
    return (
        <div className='flex flex-col'>
            <label className='texto_12_500 text-secondary pl-[12px] px-[1px]'>
                {label}
            </label>
            <textarea 
                className="texto_16_500 text-secondary placeholder:text-tertiary pl-[12px] pr-[12px] pt-[12px] pb-[12px] rounded-[8px] border-[1px] border-bg_secondary focus:border-secondary focus:border-[2px] focus:outline-none resize-none"
                placeholder={placeholder}
                rows={rows}
                {...field}
                onChange={onChange || field?.onChange}
                {...props}
            />
        </div>
    );
};