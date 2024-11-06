import { pathname } from "../config/path";
import { lazy } from "react";

const layout = lazy(() => import("../Layout"));
const HomePage = lazy(() => import("../pages/HomePage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const ProductPage = lazy(() => import("../pages/TestPage"));

export const publicRoutes = [
    { pathname: pathname.home, component: HomePage, layout: layout },
    { pathname: pathname.cart, component: CartPage, layout: layout },
    { pathname: pathname.product, component: ProductPage, layout: layout },
];
