import React from "react";
import {Box, Button, Grid, Link, Stack, Typography, useTheme} from "@mui/material";
import AuthCardWrapper from "@/components/cards/AuthCardWrapper";
import Logo from "@/components/logo";
import {useTranslation} from "react-i18next";
import AnimateButton from "@/components/animateButton";

export const CheckMail = () => {
    const theme = useTheme();
    const {t} = useTranslation();
    return (
        <>
            <Box component={"div"} minHeight={"100vh"}>
                <Grid container direction="column" justifyContent="flex-end" sx={{minHeight: '100vh'}}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center"
                              sx={{minHeight: 'calc(100vh - 68px)'}}>
                            <Grid item sx={{m: {xs: 1, sm: 3}, mb: 0}}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item>
                                            <Link href={"#"} color={"secondary"}>
                                                <Logo/>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container direction={'row'} alignItems="center"
                                                  justifyContent="center">
                                                <Grid item>
                                                    <Stack alignItems="center" justifyContent="center" spacing={4}>
                                                        <Typography color={theme.palette.secondary.main} gutterBottom
                                                                    variant={'h3'}>
                                                            {t("auth.checkMail.title")}
                                                        </Typography>
                                                        <Typography variant="caption" fontSize="16px"
                                                                    textAlign='center'>
                                                            {t("auth.checkMail.subTitle")}
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={2} sx={{width: "100%"}}>
                                                <AnimateButton>
                                                    <Button disableElevation fullWidth size="large"
                                                            type="submit" variant={"contained"}>
                                                        {t("auth.checkMail.checkButton")}
                                                    </Button>
                                                </AnimateButton>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )


}