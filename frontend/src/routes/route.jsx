import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/register";
import StudentLayout from "../layouts/StudentLayout";
import Dashboard from "../pages/student/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashBoard";
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
    },
    {
        path:"student",
        element:<StudentLayout/>,
        children:[
            {
                path:"dashboard",
                element:<Dashboard/>
            }
        ]
    },
    {
        path:"admin",
        element:<AdminLayout/>,
        children:[
            {
                path:"dashboard",
                element:<AdminDashboard/>
            }
        ]
    }
])