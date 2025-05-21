import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/register";
import StudentLayout from "../layouts/StudentLayout";
import Dashboard from "../pages/student/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashBoard";
import ApprovedRequest from "../pages/admin/requests/ApprovedRequest";
import RejectedRequest from "../pages/admin/requests/RejectedRequest";
import PendingRequest from "../pages/admin/requests/PendingRequest";
import CurrentRequest from "../pages/admin/requests/CurrentRequest";
import StudentHistory from "../pages/admin/history/StudentHistory";
import VilationHistory from "../pages/admin/history/VilationHistory";
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
            },
            {
                path:"request/approved",
                element:<ApprovedRequest/>
            },
            {
                path:"request/rejected",
                element:<RejectedRequest/>
            },
            {
                path:"request/pending",
                element:<PendingRequest/>,

            },
            {
                path:"request/current",
                element:<CurrentRequest/>
            },
            {
                path:"history/student",
                element:<StudentHistory/>
            },
            {
                path:"history/violation",
                element:<VilationHistory/>
            }
        ]
    }
])