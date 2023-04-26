import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../components/shared/homePage";
import VenueDashboard from "../features/venues/dashboard/VenueDashboard";
import VenueDetails from "../features/venues/details/VenueDetails";
import LoginForm from "../features/users/LoginForm";
import RegisterForm from "../features/users/RegisterForm";
import Reward from "../features/rewards/Reward";
import RewardVoucher from "../features/rewards/RewardVoucher";
import NotFound from "../errors/NotFound";
import ProfilePage from "../features/profiles/ProfilePage";
import UserTerms from "../policies/user-terms";
import VenueForm from "../features/venues/form/VenueForm";
import QrScanner from "../features/stamp/QRscanner";
import QrHome from "../features/stamp/Home";
import RequiredAuth from "./RequiredAuth";
import Dashboard from "../features/dashboard/Dashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequiredAuth />,
        children: [
          {
            path: "rewards",
            element: <Reward />,
          },
          {
            path: "reward/voucher",
            element: <RewardVoucher />,
          },
          {
            path: "/profiles/:username",
            element: <ProfilePage />,
          },
          {
            path: "/createVenue",
            element: <VenueForm />,
          },
          {
            path: "/qr_scanner",
            element: <QrScanner />,
          },
          {
            path: "/qrcode",
            element: <QrHome />,
          },
        ],
      },
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },

      {
        path: "not-found",
        element: <NotFound />,
      },

      {
        path: "/policies/privacy-policy",
        element: <UserTerms />,
      },
      {
        path: "/policies/user-terms",
        element: <UserTerms />,
      },
      {
        path: "venue-list",
        element: <VenueDashboard />,
      },
      {
        path: "venue-list/:id",
        element: <VenueDetails />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export const router = createBrowserRouter(routes);
