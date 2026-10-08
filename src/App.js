import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Error404 from "./pages/Error404";
 import {useContext } from "react";
 import ThemeContext from "./context/ThemeContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />
  },

    {
    path: "/about",
    element: <About />
  },



    {
    path: "/contactus",
    element: <ContactUs />
  },


    {
    path: "/profile",
    element: <Profile />
  },


    {
    path: "/signin",
    element: <SignIn />
  },

      {
    path: "/signup",
    element: <SignUp />
  },
]);


function App() {
   const {myTheme} = useContext(ThemeContext);
  return (
    <div className={`${myTheme}`}>
  <RouterProvider router={router} />
    </div>
  );
}

export default App;
