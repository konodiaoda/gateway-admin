import React from "react";
import {BaseCard} from "@/pages/authLogin/BaseCard";
import {Box} from "@mui/material";
import {Header} from "@/pages/authLogin/Header";
import RegisterForm from "@/pages/authLogin/RegisterForm";

export const Register = () => {

    return (
        <>
            <>
                <BaseCard>
                    <Box>
                        <Header/>
                        <RegisterForm/>
                    </Box>
                </BaseCard>
            </>
        </>
    )
}