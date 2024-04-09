import {PaletteOptions} from "@mui/material/styles/createPalette";
import {generalThemePalette} from "@/layout/customThemeProvider/palettes/generalThemePalette";
import {Theme} from "@mui/material";

export const palettes: {
    [key: string]: {
        darkPalette: (theme: Theme) => PaletteOptions,
        lightPalette: (theme: Theme) => PaletteOptions,
    }
} = {
    general: generalThemePalette
}