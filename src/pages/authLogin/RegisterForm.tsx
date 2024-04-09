import React, {useMemo, useState} from "react";
import {
    Box,
    Button, Checkbox, Divider,
    FormControl, FormControlLabel, FormHelperText,
    Grid,
    IconButton, Link,
    Stack,
    TextField, Typography, useTheme,
} from "@mui/material";
import {Controller, Resolver, useForm} from "react-hook-form";
import {IconEye, IconEyeOff} from "@tabler/icons-react";
import AnimateButton from "@/components/animateButton";
import {useTranslation} from "react-i18next";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {IFormRegister, IPasswordStrengthType} from "@/pages/authLogin/api";
import {maxPasswordLength, minPasswordLength, strengthColor, strengthIndicator} from "@/utils/passwordStrength";
import {NavLink, useNavigate} from "react-router-dom";

const initValues = {
    firstName: "",
    lastName: "",
    email: "",
    passWord: "",
    terms: true
}
const RegisterForm = () => {
    const theme = useTheme();
    const navigateFunction = useNavigate();
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState<IPasswordStrengthType>({
        label: 'Poor', color: theme.palette.error.main
    });
    const schema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().max(255).email(t("auth.register.form.email.errorMessage")).required(t("auth.register.form.email.required")),
            passWord: yup.string().min(minPasswordLength, t("auth.register.form.password.min")).max(maxPasswordLength, t("auth.register.form.password.max")).required(t("auth.register.form.password.required")),
            terms: yup.boolean().isTrue(t("auth.register.form.terms.errorMessage"))
        })
    }, [])
    const {formState: {isSubmitting, isValid}, control, handleSubmit} = useForm({
        mode: "onChange",
        defaultValues: initValues,
        resolver: yupResolver(schema) as Resolver<Partial<IFormRegister>>,
    });
    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp, theme));
    };
    const onSubmit = async (data: any) => {
        const res = await new Promise<any>((resolve) => {
            setTimeout(() => resolve(data), 1000);
        });
        console.log(res);
        navigateFunction("/check-mail");
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" justifyContent="center" spacing={2}>
                    {/*submit form*/}
                    <Grid item container justifyContent="space-between" spacing={2}>
                        <Grid item xs={6}>
                            <Controller
                                name={"firstName"}
                                control={control}
                                render={({
                                             field: {onBlur, value, onChange},
                                             fieldState: {error}
                                         }) => (
                                    <>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="outlined-adornment-firstName-login"
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                label={t("auth.register.form.firstName.label")}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                                variant="outlined"
                                                inputProps={{}}
                                            />
                                        </FormControl>
                                    </>
                                )}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name={"lastName"}
                                control={control}
                                render={({
                                             field: {onBlur, value, onChange},
                                             fieldState: {error}
                                         }) => (
                                    <>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="outlined-adornment-firstName-login"
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                label={t("auth.register.form.lastName.label")}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                                variant="outlined"
                                                inputProps={{}}
                                            />
                                        </FormControl>
                                    </>
                                )}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container justifyContent="center">
                        <Controller
                            name={"email"}
                            control={control}
                            render={({
                                         field: {onBlur, value, onChange},
                                         fieldState: {error}
                                     }) => (
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        id="outlined-adornment-email-login"
                                        type="email"
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        label={t("auth.register.form.email.label")}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        variant="outlined"
                                        inputProps={{}}
                                    />
                                </FormControl>)}
                        />
                    </Grid>
                    <Grid item xs={12} container justifyContent="center">
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
                                            required
                                            id="outlined-adornment-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e);
                                                changePassword(e.target.value)
                                            }}
                                            label={t("auth.register.form.password.label")}
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
                                    {strength !== 0 && (
                                        <FormControl fullWidth>
                                            <Box sx={{mb: 2}}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                        <Box style={{backgroundColor: level?.color}}
                                                             sx={{width: 85, height: 8, borderRadius: '7px'}}/>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                                            {level?.label}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </FormControl>
                                    )}
                                </>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name={"terms"}
                            render={
                                ({
                                     field: {onBlur, value, onChange},
                                     fieldState: {error}
                                 }) => (
                                    <>
                                        <FormControl>
                                            <FormControlLabel
                                                control={<Checkbox checked={value} onChange={onChange} onBlur={onBlur}
                                                                   sx={{color: error ? theme.palette.error.main : ""}}/>}
                                                label={<Typography
                                                    variant="subtitle1"
                                                    color="secondary"
                                                    sx={{
                                                        textDecoration: 'none',
                                                        cursor: 'pointer'
                                                    }}>
                                                    {t("auth.register.form.terms.agreeWith")}
                                                    <Link href="#" underline="always">
                                                        {t("auth.register.form.terms.termsAndCondition")}
                                                    </Link>
                                                </Typography>}>
                                            </FormControlLabel>
                                            {error &&
                                                <FormHelperText sx={{color: theme.palette.error.main}}>
                                                    {error.message}
                                                </FormHelperText>}
                                        </FormControl>
                                    </>
                                )
                            }/>
                    </Grid>
                    <Grid item xs={12} container alignItems="center" justifyContent="center">
                        <Stack spacing={2} sx={{width: "100%"}}>
                            <AnimateButton>
                                <Button disableElevation disabled={!isValid || isSubmitting} fullWidth size="large"
                                        type="submit" variant={"contained"}>
                                    {t("auth.register.form.action")}
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
                    <Typography component={NavLink} to={"/"} variant="subtitle1"
                                sx={{textDecoration: 'none', cursor: 'pointer', color: theme.palette.text.primary}}>
                        {t("auth.register.form.back")}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
export default RegisterForm;