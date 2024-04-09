import MainCard, {MainCardProps} from "@/components/cards/MainCard";
import {Box} from "@mui/material";
import React from "react";

export type AuthCardWrapperProps = MainCardProps

const AuthCardWrapper = ({children, ...other}: AuthCardWrapperProps) => (
    <MainCard
        sx={{
            maxWidth: {xs: 400, lg: 475},
            margin: {xs: 2.5, md: 3},
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        mainCardContent={false}
        {...other}
    >
        <Box sx={{p: {xs: 2, sm: 3, xl: 5}}}>{children}</Box>
    </MainCard>
);


export default AuthCardWrapper;
