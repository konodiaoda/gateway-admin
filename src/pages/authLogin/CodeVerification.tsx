import React, {useState} from "react";
import {Box, Button, Divider, Grid, Link, Stack, Typography, useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import AuthCardWrapper from "@/components/cards/AuthCardWrapper";
import Logo from "@/components/logo";
import AnimateButton from "@/components/animateButton";
import MuiOptInput from "@/components/optInput";

const optLength = 4;
export const CodeVerification = () => {
    const theme = useTheme();
    const {t} = useTranslation();
    const sendYouCodeMsg = t("auth.codeVerification.sendYouCode", {"userEmail": "john.****@company.com"})
    const [otp, setOtp] = useState('')
    const handleChange = (newValue: string) => {
        setOtp(newValue)
    }
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
                                            <Grid container direction={'row'}
                                                  alignItems="center" justifyContent="center">
                                                <Grid item>
                                                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                                                        <Typography color={theme.palette.secondary.main} gutterBottom
                                                                    variant={'h3'}>
                                                            {t("auth.codeVerification.title")}
                                                        </Typography>
                                                        <Typography variant="caption" fontSize="16px"
                                                                    textAlign='center'>
                                                            {t("auth.codeVerification.subTitle")}
                                                        </Typography>
                                                        <Typography variant="caption" fontSize="16px"
                                                                    textAlign='center'>
                                                            {sendYouCodeMsg}
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item container xs={12}>
                                            <MuiOptInput length={optLength}
                                                         value={otp}
                                                         onChange={handleChange}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button disableElevation fullWidth size="large"
                                                    disabled={otp.length < optLength} type="submit"
                                                    variant={"contained"}>
                                                {t("auth.codeVerification.form.continue")}
                                            </Button>
                                        </Grid>
                                        <Divider sx={{flexGrow: 1}} orientation="horizontal"/>
                                        <Grid item xs={12}>
                                            <Stack spacing={2} sx={{width: "100%"}}>
                                                <Typography variant="caption" fontSize="16px"
                                                            textAlign='center'>
                                                    {t("auth.codeVerification.resendCodeMessage")}
                                                </Typography>
                                                <AnimateButton>
                                                    <Button disableElevation fullWidth size="large"
                                                            sx={{color: theme.palette.secondary.main}}
                                                            color={"secondary"} type="submit" variant={"outlined"}>
                                                        {t("auth.codeVerification.form.resendCode")}
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