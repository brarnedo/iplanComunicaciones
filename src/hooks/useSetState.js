/* ----------------------------------------- react redux ---------------------------------------- */
import { useDispatch } from "react-redux";
import {
  setIsAuthenticated,
  setSeleccionada,
} from "store";
export const useSetState = () => {
  const dispatch = useDispatch();
  return {
    setIsAuthenticated: (value) =>
      dispatch(setIsAuthenticated({ isAuthenticated: value })),
      setSeleccionada: (value) =>
      dispatch(setSeleccionada({ seleccionada: value })),
  };
};
