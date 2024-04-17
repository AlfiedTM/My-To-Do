import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {Register, HomeLayout, Task, Error, Login} from './pages';

// Errors
import {ErrorElement} from "./components/index.jsx";

// Loaders
import {loader as landingLoader} from './pages/home layout/page';
import { CreateTask } from "./pages/task/page.jsx";
import { useSelector } from "react-redux";




// Routes

const App = () =>{
  const { isLoggedIn } = useSelector((state) => {
    return state.user;
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <HomeLayout /> : <Login />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Task />,
          errorElement: <ErrorElement />,
          loader: landingLoader,
        },
        {
          path: "tasks",
          element: <Task />,
        },
        {
          path: "new",
          element: <CreateTask />,
        },
        {
          path: "task/:id",
          element: <Task />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
    },
  ]);
    return <RouterProvider router={router}/>
};
export default App;