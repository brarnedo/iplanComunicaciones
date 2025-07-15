import { BASE, LOGIN } from "env";
import axios from "axios";
import Cookies from "js-cookie";

import {
  setIsAuthenticated,
  starLoadingLogin,
  setUser,
  setRole,
  setAdminLevel,
  setErrorLogin,
  setSession,
} from "./authSlice";

export const getAuth = (numero, contrasena) => {
  return async (dispatch, getState) => {
    dispatch(starLoadingLogin(true));
    let data = {
      user: numero,
      pass: contrasena
    };
    let config = {
      method: "post",
      url: `${BASE}${LOGIN}`,
      data: data,
    };

    try {
      const response = await axios.request(config);
      // console.log("👀 - :30 - return - response:", response);

      if (response.status == 200) {
        dispatch(starLoadingLogin(false));
        dispatch(setIsAuthenticated({ isAuthenticated: response.data.data.authenticated }));
        dispatch(setUser({ user: response.data.data.user.username }));
        dispatch(setRole({ role: response.data.data.user.role }));
        dispatch(setAdminLevel({ admin_level: response.data.data.user.admin_level }));
        dispatch(setErrorLogin({ errorLogin: false }));
        dispatch(setSession({ session: response.data.data.token }));
        Cookies.set("LOGIN", "OK");
        Cookies.set("token", response.data.data.token);
        return "OK";
      }
    } catch (error) {
      console.log("👀 - return - error:", error);
      dispatch(starLoadingLogin(false));
      dispatch(setErrorLogin({ errorLogin: true }));
    }
  };
};
