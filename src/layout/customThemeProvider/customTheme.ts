import {themePalette} from "@/layout/customThemeProvider/palette";
import transitions from "@/layout/customThemeProvider/transitions";
import {shape} from "@/layout/customThemeProvider/shape";
import {themeTypography} from "@/layout/customThemeProvider/typography";
import {createTheme} from "@mui/material";
import {componentStyleOverrides} from "@/layout/customThemeProvider/compStyleOverride";
import {useEffect} from "react";
import {useCustomSettingStore} from "@/stores/customSettingStore";

export const customTheme = () => {
    const customSetting = useCustomSettingStore((state) => state)

    useEffect(() => {
        document.body.dir = customSetting.themeLayout;
    }, [customSetting.themeLayout]);

    const themeOptions = {
        direction: customSetting.themeLayout,
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        transitions: transitions,
        shape: shape(customSetting)
    };
    // create base Options
    let baseTheme = createTheme(themeOptions);
    // set palette
    baseTheme = createTheme(baseTheme, {
        palette: themePalette(customSetting, baseTheme),
    })
    // set components
    return createTheme(baseTheme, {
        components: componentStyleOverrides(baseTheme),
        typography: themeTypography(customSetting, baseTheme),
    })
}