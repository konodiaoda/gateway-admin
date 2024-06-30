// ==============================|| MAIN ROUTING ||============================== //
import React, {lazy} from "react";
import MainLayout from "@/layout/MainLayout";
import Loadable from "@/layout/Loadable";

const Default = Loadable(lazy(() => import('../pages/dashboard/Default').then(({Default}) => ({default: Default}))));

const MainRoutes = {
    path: 'admin',
    element: <MainLayout/>,
    children: [
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: Default
                }
            ]
        },
    ]
};

export default MainRoutes;
