import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Root from "./Layout/Root";
import Home from "./components/Home";
import Challenges from "./components/Challenges";
import MyActivities from "./components/MyActivities";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import AuthProvider from "./contexts/AuthProvider";
import Details from "./components/Details";
import AddChallenges from "./components/AddChallenges";
import UpdateChallenge from "./components/UpdateChallenge";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/challenges",
        loader: () => fetch("http://localhost:3000/challenges"),
        element: <Challenges></Challenges>,
      },
      {
        path: "/myActivities",
        element: <MyActivities></MyActivities>,
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/challengesDetail/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/challenges/${params.id}`),
        element: <Details></Details>,
      },
      {
        path: "/challengesActivities/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/challenges/${params.id}`),
      },
      {
        path: "/addChallenges",
        element: <AddChallenges></AddChallenges>,
      },
      {
        path: "/updateChallenge/:id",
        element: <UpdateChallenge></UpdateChallenge>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
