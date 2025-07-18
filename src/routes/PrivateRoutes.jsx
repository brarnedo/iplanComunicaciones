/* -------------------------------------------- libs -------------------------------------------- */
import Cookies from 'js-cookie';
/* ----------------------------------------- react redux ---------------------------------------- */
import { useSelector } from 'react-redux';
/* ---------------------------------------- react router ---------------------------------------- */
import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
  const cookieLogin = Cookies.get("LOGIN");
  
  const { isAuthenticated } = useSelector((state) => state.auth);

  // return isAuthenticated ? children : <Navigate to="/" />;//PROD
   return isAuthenticated || cookieLogin ? children : <Navigate to="/" />;//DEV
};