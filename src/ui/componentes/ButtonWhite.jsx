export const ButtonWhite = ({
  hover = false,
  icon = "",
  disabled = false,
  texto = "",
  type = "button",
  width = "auto",
}) => {
  return (
    <button
      className={`texto_btn flex h-[36px] cursor-pointer items-center justify-center gap-2 rounded-[25px] bg-white px-4 pb-[7px] pt-2 text-tertiary ${hover ? "hover:bg-primary" : ""}`}
      disabled={disabled}
      style={{ width: `${width}px` }}
      type={type}
    >
      <p>{texto}</p>
      {icon && <span className="material-symbols-outlined">{icon}</span>}
    </button>
  );
};
