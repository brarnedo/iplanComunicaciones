/* ----------------------------------------- react redux ---------------------------------------- */
import { useDispatch } from "react-redux";
import {
  setIsAuthenticated,
} from "store";
export const useSetState = () => {
  const dispatch = useDispatch();
  return {
    setIsAuthenticated: (value) =>
      dispatch(setIsAuthenticated({ isAuthenticated: value })),
  };
};
