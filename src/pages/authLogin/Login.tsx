import React from "react";
import {BaseCard} from "@/pages/authLogin/BaseCard";
import {Header} from "@/pages/authLogin/Header";
import {LoginForm} from "@/pages/authLogin/LoginForm";
import {Box} from "@mui/material";

export const Login = () => {
    return (
        <>
            <BaseCard>
                <Box>
                    <Header/>
                    <LoginForm/>
                </Box>
            </BaseCard>
        </>
    )
}