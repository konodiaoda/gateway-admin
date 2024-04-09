import {darkGrey, lightGrey} from "@/layout/customThemeProvider/palettes/colors";
import {Theme} from "@mui/material";


const darkPalette = (theme: Theme) => {
    return {
        grey: darkGrey,
        orange: theme.palette.augmentColor({
            color: {
                light: "#fbe9e7",
                main: "#ffab91",
                dark: "#d84315"
            },
            name: 'orange',
        }),
        primary: {
            lighter: "#90CAF9",
            main: "#2196F3",
            light: "#E3F2FD",
            dark: "#1E88E5",
            darker: "#1565C0",
            contrastText: "#d6dceb",
        },
        secondary: {
            lighter: "#B39DDB",
            main: "#7C4DFF",
            light: "#D1C4E9",
            dark: "#651FFF",
            darker: "#1565C0",
            contrastText: "#d6dceb",
        },
        success: {
            lighter: "#69F0AE",
            main: "#00E676",
            light: "#B9F6CA",
            dark: "#00C853",
        },
        error: {
            main: "#F44336",
            light: "#EF9A9A",
            dark: "#C62828",
        },
        warning: {
            main: "#FFE57F",
            light: "#FFF8E1",
            dark: "#FFC107",
        },
        text: {
            primary: darkGrey[100],
            secondary: darkGrey[300],
        },
        divider: darkGrey[700],
        background: {
            paper: darkGrey[900],
            default: darkGrey[800],
        },
    };
}

const lightPalette = (theme: Theme) => {
    return {
        grey: lightGrey,
        orange: theme.palette.augmentColor({
            color: {
                light: "#fbe9e7",
                main: "#ffab91",
                dark: "#d84315"
            },
            name: 'orange',
        }),
        primary: {
            lighter: "#90CAF9",
            main: "#2196F3",
            light: "#E3F2FD",
            dark: "#1E88E5",
            darker: "#1565C0",
            contrastText: "#111926",
        },
        secondary: {
            lighter: "#B39DDB",
            main: "#673AB7",
            light: "#EDE7F6",
            dark: "#5E35B1",
            darker: "#4527A0",
            contrastText: "#111926",
        },
        success: {
            lighter: "#69F0AE",
            main: "#00E676",
            light: "#B9F6CA",
            dark: "#00C853",
        },
        error: {
            main: "#F44336",
            light: "#EF9A9A",
            dark: "#C62828",
        },
        warning: {
            main: "#FFE57F",
            light: "#FFF8E1",
            dark: "#FFC107",
        },
        text: {
            primary: lightGrey[700],
            secondary: lightGrey[500],
        },
        divider: lightGrey[100],
        background: {
            paper: "#FFF",
            default: lightGrey[50],
        },
    };
}

export const generalThemePalette = {
    darkPalette,
    lightPalette,
}