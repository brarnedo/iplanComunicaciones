import { RouterProvider, createHashRouter } from "react-router-dom";
import { Login, Archivadas, Programadas, NuevaComunicacion} from 'pages';
import { Home, Layout } from "layouts";
import { PrivateRoutes } from "router";

const router = createHashRouter([
{
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,  // ← URL: /
      },
      {
        path: "home",
        element: <Home />,   // ← URL: /home
        children: [
          {
            index: true,
            element: <NuevaComunicacion />,  // ← Por defecto en /home
          }
        ]
      },
      {
        path: "archivadas", 
        element: <Home />,   // ← URL: /archivadas
        children: [
          {
            index: true,
            element: <Archivadas />,
          }
        ]
      },
      {
        path: "programadas",
        element: <Home />,   // ← URL: /programadas  
        children: [
          {
            index: true,
            element: <Programadas />,
          }
        ]
      },
    ],
  },
]);


export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
