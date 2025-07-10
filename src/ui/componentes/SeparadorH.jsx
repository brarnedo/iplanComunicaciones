export const SeparadorH = ({ width = "48", separador = "16" }) => {
  return (
    <div
      className="bg-bg_secondary hidden w-full h-[1px] md:flex"
      style={{ minWidth: `${width}px`, margin: ` ${separador}px 0` }}
    ></div>
  );
};
