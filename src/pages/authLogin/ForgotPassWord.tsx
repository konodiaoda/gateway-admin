import React, {useMemo} from "react";
import {Box, Button, Divider, FormControl, Grid, Link, Stack, TextField, Typography, useTheme} from "@mui/material";
import AuthCardWrapper from "@/components/cards/AuthCardWrapper";
import Logo from "@/components/logo";
import {useTranslation} from "react-i18next";
import {Controller, Resolver, useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {IFormForgot} from "@/pages/authLogin/api";
import AnimateButton from "@/components/animateButton";
import {NavLink, useNavigate} from "react-router-dom";

export const ForgotPassWord = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const schema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().max(255).email('Must be a valid email').required('Email is required'),
        })
    }, [])
    const {formState: {isSubmitting, isValid}, control, handleSubmit} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema) as Resolver<Partial<IFormForgot>>,
    });

    const onSubmit = async (data: any) => {
        const res = await new Promise<any>((resolve) => {
            setTimeout(() => resolve(data), 1000);
        });
        console.log(res);
        navigate("/check-mail");
    };

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
                                                    <Stack alignItems="center" justifyContent="center" spacing={4}>
                                                        <Typography color={theme.palette.secondary.main} gutterBottom
                                                                    variant={'h3'}>
                                                            {t("auth.forgotPassword.title")}
                                                        </Typography>
                                                        <Typography variant="caption" fontSize="16px"
                                                                    textAlign='center'>
                                                            {t("auth.forgotPassword.subTitle")}
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <Grid container direction="column" justifyContent="center" spacing={2}>
                                                    <Grid item xs={12} container alignItems="center"
                                                          justifyContent="center">
                                                        <FormControl fullWidth>
                                                            <Controller
                                                                name={"email"}
                                                                control={control}
                                                                render={({
                                                                             field: {onBlur, value, onChange},
                                                                             fieldState: {error}
                                                                         }) => (
                                                                    <TextField
                                                                        id="outlined-adornment-forgot-email"
                                                                        type="email"
                                                                        value={value}
                                                                        onBlur={onBlur}
                                                                        onChange={onChange}
                                                                        label="Email Address / Username"
                                                                        error={!!error}
                                                                        helperText={error ? error.message : null}
                                                                        variant="outlined"
                                                                        inputProps={{}}
                                                                    />)}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} container alignItems="center"
                                                          justifyContent="center">
                                                        <Stack spacing={2} sx={{width: "100%"}}>
                                                            <AnimateButton>
                                                                <Button disableElevation
                                                                        disabled={!isValid || isSubmitting} fullWidth
                                                                        size="large"
                                                                        type="submit" variant={"contained"}>
                                                                    {t("auth.forgotPassword.form.action")}
                                                                </Button>
                                                            </AnimateButton>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider/>
                                        </Grid>
                                        <Grid item xs={12} container alignItems="center" justifyContent="center">
                                            <Typography component={NavLink} to={"/"} variant="subtitle1"
                                                        sx={{
                                                            textDecoration: 'none',
                                                            cursor: 'pointer',
                                                            color: theme.palette.text.primary
                                                        }}>
                                                {t("auth.forgotPassword.form.back")}
                                            </Typography>
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