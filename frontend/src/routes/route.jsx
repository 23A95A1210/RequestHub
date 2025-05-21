import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/register";
export const routes=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>,
            }
        ]
    },
    {
        path:"login",
        element:<Login/>
    },
    {
        path:"register",
        element:<Register/>
    }
])