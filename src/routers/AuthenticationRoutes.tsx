import Loadable from "@/layout/Loadable";
import {lazy} from "react";
import MinimalLayout from "@/layout/MinimalLayout/index";
import {RouteObject} from "react-router-dom";
import React from "react";

const AuthLogin = Loadable(lazy(() => import('../pages/authLogin/Login').then(({Login}) => ({default: Login}))));
const ForgotPassWord = Loadable(lazy(() => import('../pages/authLogin/ForgotPassWord').then(({ForgotPassWord}) => ({default: ForgotPassWord}))));
const CheckMail = Loadable(lazy(() => import('../pages/authLogin/CheckMail').then(({CheckMail}) => ({default: CheckMail}))));
const Register = Loadable(lazy(() => import('../pages/authLogin/Register').then(({Register}) => ({default: Register}))));
const CodeVerification = Loadable(lazy(() => import('../pages/authLogin/CodeVerification').then(({CodeVerification}) => ({default: CodeVerification}))));
export const AuthenticationRoutes: RouteObject =
    {
        path: "/",
        element: <MinimalLayout/>,
        children: [
            {
                index: true,
                element: AuthLogin,
            },
            {
                path: "register",
                element: Register,
                caseSensitive: true,
            },
            {
                path: "forgot-password",
                element: ForgotPassWord,
            },
            {
                path: "check-mail",
                element: CheckMail,
            },
            {
                path: "code-verification",
                element: CodeVerification,
            }
        ]
    }