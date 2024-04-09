import LogoSvg from "@/assets/svg/logo.svg?react";
import {Box, BoxProps} from "@mui/material";
import React from "react";

type LogoProps = {
    size?: number;
} & BoxProps;

const Logo = ({size = 40, ...boxProps}: LogoProps) => {
    return (
        <Box {...boxProps}>
            <LogoSvg height={size} width={size}/>
        </Box>
    );
};

export default Logo;
