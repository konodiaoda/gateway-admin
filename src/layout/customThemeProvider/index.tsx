import {CssBaseline, ThemeProvider} from "@mui/material";
import {customTheme} from "@/layout/customThemeProvider/customTheme";
import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

type SettingsProviderProps = {
    children: React.ReactNode;
};
export const CustomThemeProvider = ({children}: SettingsProviderProps) => {
    const theme = customTheme()
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline/>
                {children}
            </LocalizationProvider>
        </ThemeProvider>
    );
};