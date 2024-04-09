import {palettes} from "@/layout/customThemeProvider/palettes";
import {Theme} from "@mui/material/styles/createTheme";
import {Customization} from "@/typings/global";

export const themePalette = (customization: Customization, theme: Theme) => {
    const themeColors = palettes[customization.themeType];
    const palette = customization.themeMode === "light" ? themeColors.lightPalette : themeColors.darkPalette
    const colors = palette(theme)
    return {
        contrastThreshold: customization.contrastThreshold,
        mode: customization.themeMode,
        ...colors
    }
}


