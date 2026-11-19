import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./Layout.jsx";
import { NotFound } from "./NotFound.jsx";
import { Login } from "../pages/LoginPage/ui/Login.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { MainList } from "../pages/MainPage/ui/MainList.jsx";
import { ProfilePage } from "../pages/ProfilePage/ui/ProfilePage.jsx";
import { LessonsPage } from "../pages/LessonsPage/ui/LessonsPage.jsx";
import { TasksList } from "../pages/TasksPge/ui/TasksList.jsx";
import { TaskDetailPage } from "../pages/TasksPge/ui/TaskDetailPage.jsx";
import { AboutMeList } from "../pages/AboutMePage/ui/AboutMeList.jsx";
import { Nothing } from "./Nothing.jsx";
import { EventsList } from "../pages/EventsPage/ui/EventsList.jsx";
import { ProfileAchievementsDetail } from "../pages/AchievementsPage/ui/ProfileAchievementsDetail.jsx";
import { AchievementsPage } from "../pages/AchievementsPage/ui/AchievementsPage.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
         
          {
            path: "main",
            element: <MainList />,
          },
          {
            path: "lessons",
            element: <LessonsPage />,
          },
          {
            path: "results",
            element: <Nothing />,
          },
          {
            path: "tasks",
            element: <TasksList />,
          },
          {
            path: "tasks/:id",
            element: <TaskDetailPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "about",
            element: <AboutMeList />,
          },
          {
            path: "profile/:id",
            element: <ProfileAchievementsDetail/>
          },
          {
            path: "achievements",
            element: <AchievementsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
