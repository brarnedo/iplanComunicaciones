import { RouterProvider, createHashRouter } from "react-router-dom";
import { Login } from 'pages';
import { Home, Layout } from "layouts";
//import { PrivateRoutes } from "router";

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
          path: "/home/",
          element: (
          //  <PrivateRoutes>
              <Home />
          //  </PrivateRoutes>
          ),
		  /*
          children: [
          {
            index: true,
            path: "home",
            element: <Resultado />,
          },
          {
            path: "resultado",
            element: <Resultado />,
          },
          {
            path: "resultado/:id",
            element: <DataCenter />,
          },
          {
            path: "accesos",
            element: <AccessByDate/>
          }
        	],*/
      },
    ],
  },
]);


export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
