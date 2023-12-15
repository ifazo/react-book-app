import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AddProducts from "../pages/AddProduct";
import ProductCategory from "../pages/ProductCategory";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import DashboardPage from "../pages/DashboardPage";
import EditProduct from "../pages/EditProduct";
import PrivateRouter from "./PrivateRouter";

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
                element: <PrivateRouter><AddProducts /></PrivateRouter>
            },
            {
                path: "/books/edit/:id",
                element: <PrivateRouter><EditProduct /></PrivateRouter>
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