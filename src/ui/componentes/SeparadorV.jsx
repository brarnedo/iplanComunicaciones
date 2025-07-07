export const SeparadorV = ({ height = "48", separador = "16" }) => {
  return (
    <div
      className="bg-bg_secondary hidden h-full w-[1px] md:flex"
      style={{ minHeight: `${height}px`, margin: `0 ${separador}px` }}
    ></div>
  );
};
