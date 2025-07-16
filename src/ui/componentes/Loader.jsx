import "./loader.css";
export const Loader = ({ color, size }) => {
  return (
    <div className='bg-white h-[150px] flex-1 p-[16px] rounded-[12px] mr-0 xl:mr-[124px] flex flex-col gap-[16px]'>
      <div className='p-[8px] flex flex-col items-center justify-center rounded-[12px] gap-[8px]'>
        <div
          className="loader"
          style={{ color: `${color}`, height: `${size}px`, width: `${size}px` }}
        ></div>
        <p className='text-primary texto_20_600'> Cargando... </p>
      </div>
    </div>
  );
};
