import React from "react";
import {menuItems} from "@/layout/MenuList/types";
import {Typography} from "@mui/material";


const MenuList = () => {
    const navItems = menuItems.map(key => {
        switch (key.type) {
            case "group":
                return <></>
            default:
                return (
                    <Typography key={key.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    })
    return <>{navItems}</>
}
export default MenuList