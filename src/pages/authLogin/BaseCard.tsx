import {Box, Grid, Link, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import AuthCardWrapper from "@/components/cards/AuthCardWrapper";
import Logo from "@/components/logo";
import {useTranslation} from "react-i18next";
import React from "react";
import {useLocation} from "react-router-dom";

type BaseCardType = {
    children: React.ReactNode
}
export const BaseCard = ({children}: BaseCardType) => {
    const location = useLocation();
    const theme = useTheme();
    const {t} = useTranslation();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box component={"div"} minHeight={"100vh"}>
            <Grid container direction="column" justifyContent="flex-end" sx={{minHeight: '100vh'}}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{minHeight: 'calc(100vh - 68px)'}}>
                        <Grid item sx={{m: {xs: 1, sm: 3}, mb: 0}}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Link href={"#"} color={"secondary"}>
                                            <Logo/>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction={matchDownSM ? 'column-reverse' : 'row'}
                                              alignItems="center" justifyContent="center">
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography color={theme.palette.secondary.main} gutterBottom
                                                                variant={matchDownSM ? 'h3' : 'h2'}>
                                                        {location.pathname === "/register" ? t("auth.register.title") : t("auth.login.title")}
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px"
                                                                textAlign={matchDownSM ? 'center' : 'inherit'}>
                                                        {t("auth.login.subTitle")}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {children}
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};