import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./components/context/auth.context";
import { publicRoutes } from "./routes";
import Layout from "./Layout";

const renderRoute = (route) => (
    <Route
        key={route.pathname}
        path={route.pathname}
        element={
            <Suspense fallback={<div>Loading...</div>}>
                <route.component />
            </Suspense>
        }
    />
);

export default function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route element={<Layout />}>{publicRoutes.filter((route) => route.layout).map(renderRoute)}</Route>

                {publicRoutes.filter((route) => !route.layout).map(renderRoute)}
            </Routes>
        </UserContextProvider>
    );
}
