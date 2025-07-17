import "./loader.css";
export const Loader = ({ color, size }) => {
  return (
        <div
          className="loader"
          style={{ color: `${color}`, height: `${size}px`, width: `${size}px` }}
        ></div>
  );
}; 

