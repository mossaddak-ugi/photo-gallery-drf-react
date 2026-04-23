import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CalculatorPage from "./components/pages/calculator";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import SignUp from "./components/pages/signup";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/calculator",
      element: <CalculatorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
