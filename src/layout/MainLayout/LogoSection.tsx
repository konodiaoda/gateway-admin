import React from "react";
import {IconButton} from "@mui/material";
import {Link} from 'react-router-dom';
import Logo from "@/components/logo";
import {navigation2Defeat} from "@/stores/customSettingStore";

const LogoSection = () => {
    return (<>
        <IconButton color={"secondary"} disableRipple onClick={() => navigation2Defeat()} component={Link} to={"/"}>
            <Logo/>
        </IconButton>
    </>)
}

export default LogoSection;