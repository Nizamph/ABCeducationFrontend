import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/SignUp";
import Home from "./components/AdminHome";
import AppContainer from "./components/AppContainer";
import AdminHome from "./components/AdminHome";
import UserHome from "./components/UserHome";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppContainer />,
    children: [
      {
        path: "/admin/home",
        element: <AdminHome />,
      },
      {
        path: "/user/home",
        element: <UserHome />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
