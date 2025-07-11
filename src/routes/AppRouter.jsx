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
        element: <PrivateRoutes><Home /></PrivateRoutes>,   // ← URL: /home
        children: [
          {
            index: true,
            path: "home",
            element: <NuevaComunicacion />,  // ← Por defecto en /home
          },
          {
            path: "archivadas",
            element: <Archivadas />,
          },
          {
            path: "programadas",
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
