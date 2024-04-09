import {Outlet} from "react-router-dom";
import Levitate from "@/layout/levitate";
import React from "react";

const MinimalLayout = () => {
    return (
        <>
            <Outlet/>
            <Levitate/>
        </>
    )
}
export default MinimalLayout;