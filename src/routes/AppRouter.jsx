import { RouterProvider, createHashRouter } from "react-router-dom";
import { Login } from 'pages';
import { Home, Layout } from "layouts";
import { PrivateRoutes } from "router";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
          path: "/notificaciones/",
          element: (
           <PrivateRoutes>
              <Home />
           </PrivateRoutes>
          ),
          children: [
          {
            index: true,
            path: "home",
            element: <div>hola</div>,
          },
        ],
      },  
    ],
  },
]);


export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
