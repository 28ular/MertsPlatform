import {createBrowserRouter, Navigate} from "react-router-dom";
import {Layout} from "./Layout.jsx";
import {NotFound} from "./NotFound.jsx";
import {Login} from "../pages/LoginPage/ ui/Login.jsx";
import {ProtectedRoute} from "./ProtectedRoute.jsx";
import {MainList} from "../pages/MainPage/ui/MainList.jsx";
import {ProfilePage} from "../pages/ProfilePage/ui/ProfilePage.jsx";
import {LessonsPage} from "../pages/LessonsPage/ui/LessonsPage.jsx";
import {TasksList} from "../pages/TasksPge/ui/TasksList.jsx";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/auth" replace />
    },
    {
        path: "/auth",
        element: <Login />
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
             element: <ProtectedRoute />,
             children: [
                 {
                     path: "materials",
                     element: <h1>materials</h1>
                 },
                 {
                     path:'main', element: <MainList/>
                 },
                 {
                     path: 'lessons',
                     element: <LessonsPage/>
                 },
                 {
                     path: 'results',
                     element: <h1>results</h1>
                 },
                 {
                     path: 'tasks',
                     element: <TasksList/>
                 },
                 {
                     path:'profile',
                     element: <ProfilePage/>
                 }
             ]
            }
        ]
    },

    {
        path: "*",
        element: <NotFound />
    }
]);