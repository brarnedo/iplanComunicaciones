import { BASE, LOGIN } from "env";
import axios from "axios";
import Cookies from "js-cookie";

import {
  setIsAuthenticated,
  starLoadingLogin,
  setUser,
  setErrorLogin,
  setSession,
} from "./authSlice";

export const getAuth = (numero, contrasena) => {
  return async (dispatch, getState) => {
    dispatch(starLoadingLogin(true));
    let formData = new FormData();
    formData.append("user", numero);
    formData.append("pass", contrasena);
    let config = {
      method: "post",
      url: `${BASE}${LOGIN}`,
      data: formData,
    };

    try {
      const response = await axios.request(config);

      if (response.status == 200) {
        dispatch(starLoadingLogin(false));
        dispatch(setIsAuthenticated({ isAuthenticated: true }));
        dispatch(setUser({ user: numero }));
        dispatch(setErrorLogin({ errorLogin: false }));
        dispatch(setSession({ session: response.data.session_id }));
        Cookies.set("LOGIN", "OK");
        return "OK";
      }
    } catch (error) {
      console.log("👀 - return - error:", error);
      dispatch(starLoadingLogin(false));
      dispatch(setErrorLogin({ errorLogin: true }));
    }
  };
};
