import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProductCategory from "../pages/BookPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRouter from "./PrivateRouter";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/books",
                element: <ProductCategory />,
            },
            {
                path: "/books/:id",
                element: <ProductDetailsPage />
            },
            {
                path: "/books/add",
                element: <PrivateRouter><AddBook /></PrivateRouter>
            },
            {
                path: "/books/edit/:id",
                element: <PrivateRouter><EditBook /></PrivateRouter>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRouter><DashboardPage /></PrivateRouter>
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

export default router;