import {Box, Button, Divider, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import AnimateButton from "@/components/animateButton";
import Google from "@/assets/svg/social-google.svg";
import React from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";

export const Header = () => {
    const theme = useTheme();
    const location = useLocation();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t} = useTranslation();
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            size="large"
                            variant="outlined"
                            sx={{
                                borderColor: (theme) => theme.palette.grey[100],
                                color: (theme) => theme.palette.text.primary
                            }}
                        >
                            <img src={Google} alt="google" width={16} height={16}
                                 style={{marginRight: matchDownSM ? 8 : 16}}/>
                            {t("auth.login.signWithGoogle")}
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Divider sx={{flexGrow: 1}} orientation="horizontal"/>
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                fontWeight: 500,
                                borderColor: `${theme.palette.grey[100]}!important`,
                                color: `${theme.palette.text.primary}!important`,
                            }}
                            disableRipple
                            disabled
                        >
                            {t("auth.login.or")}
                        </Button>
                        <Divider sx={{flexGrow: 1}} orientation="horizontal"/>
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{mb: 2}}>
                        <Typography variant="subtitle1">
                            {location.pathname === "/register" ? t("auth.register.registerWithEmail") : t("auth.login.signWithEmail")}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )


}