import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Courses,
  Home,
  ErrorPage,
  ContactPage,
  Community,
  RegisterUser,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/register",
    element: <RegisterUser />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
