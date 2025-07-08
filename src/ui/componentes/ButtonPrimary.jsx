export const ButtonPrimary = ({
  hover = false,
  icon = "",
  disabled = false,
  texto = "",
  type = "button",
  width = "auto",
  click = null
}) => {
  return (
    <button
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-[25px] bg-primary py-[8px] px-[24px]  ${hover ? "hover:bg-bg_secondary" : ""}`}
      disabled={disabled}
      style={{ width: `${width}px` }}
      type={type}
      onClick={click}
    >
      <span className="text-white texto_16_500">{texto}</span>
      {icon && <span className="material-symbols-outlined">{icon}</span>}
    </button>
  );
};
