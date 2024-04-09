import AnimateButton from "@/components/animateButton";
import {
    Button, Checkbox, Divider,
    FormControl, FormControlLabel,
    Grid, IconButton, Stack,
    TextField,
    Typography, useTheme,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import React, {useMemo, useState} from "react";
import {Controller, Resolver, useForm} from "react-hook-form";
import {IFormInput} from "@/pages/authLogin/api";
import {IconEyeOff, IconEye} from '@tabler/icons-react';
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {NavLink, useNavigate} from 'react-router-dom';

const initialValues = {
    email: 'beshunter6@gmail.com',
    passWord: 'justSimpleTemplate',
}
export const LoginForm = () => {
    const theme = useTheme();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const schema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().max(255).email('Must be a valid email').required('Email is required'),
            passWord: yup.string().max(255).required('Password is required'),
        })
    }, [])
    const {formState: {isSubmitting, isValid}, control, handleSubmit} = useForm({
        mode: "onChange",
        defaultValues: initialValues,
        resolver: yupResolver(schema) as Resolver<Partial<IFormInput>>,
    });
    const onSubmit = async (data: any) => {
        const res = await new Promise<any>((resolve) => {
            setTimeout(() => resolve(data), 1000);
        });
        console.log(res);
        navigate("/admin/dashboard/default")
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" justifyContent="center" spacing={2}>
                    {/*submit form*/}
                    <Grid item xs={12} container alignItems="center" justifyContent="center">
                        <Controller
                            name={"email"}
                            control={control}
                            render={({
                                         field: {onBlur, value, onChange},
                                         fieldState: {error}
                                     }) => (
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-adornment-email-login"
                                        type="email"
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        label="Email Address / Username"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        variant="outlined"
                                        inputProps={{}}
                                    />
                                </FormControl>)}
                        />
                    </Grid>
                    <Grid item xs={12} container alignItems="center" justifyContent="center">
                        <Controller
                            name={"passWord"}
                            control={control}
                            render={({
                                         field: {onBlur, value, onChange},
                                         fieldState: {error}
                                     }) => (
                                <>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-adornment-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            label="Password"
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                            InputProps={{
                                                endAdornment:
                                                    <IconButton
                                                        color={"primary"}
                                                        aria-label="toggle password visibility"
                                                        onClick={() => {
                                                            setShowPassword((show) => !show)
                                                        }}
                                                        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                            event.preventDefault()
                                                        }}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <IconEyeOff/> : <IconEye/>}
                                                    </IconButton>
                                            }}
                                        />
                                    </FormControl>
                                </>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} container alignItems={"center"} justifyContent={"space-between"}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={rememberMe}
                                          onChange={(event) => setRememberMe(event.target.checked)}
                                          name="checked" color="primary"/>
                            }
                            label={t("auth.login.form.rememberMe")}
                        />
                        <Typography component={NavLink} to={"/forgot-password"}
                                    variant="subtitle1" color="secondary"
                                    sx={{textDecoration: 'none', cursor: 'pointer'}}>
                            {t("auth.login.forgotPassword")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container alignItems="center" justifyContent="center">
                        <Stack spacing={2} sx={{width: "100%"}}>
                            <AnimateButton>
                                <Button disableElevation disabled={!isValid || isSubmitting} fullWidth size="large"
                                        type="submit" variant={"contained"}>
                                    {t("auth.login.form.action")}
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} sx={{marginTop: 2}}>
                    <Divider/>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Typography component={NavLink} to={"/register"} variant="subtitle1"
                                sx={{textDecoration: 'none', cursor: 'pointer', color: theme.palette.text.primary}}>
                        {t("auth.login.form.haveNoAccount")}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};
