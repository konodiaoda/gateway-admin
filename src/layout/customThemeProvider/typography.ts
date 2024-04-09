import {Customization} from "@/typings/global";
import {Theme} from "@mui/material";

export const themeTypography = (customization: Customization, theme: Theme) => {
    return {
        fontFamily: customization.fontStyle,
        fontWeightMedium: 700,
        fontWeightBold: 800,
        h1: {
            fontWeight: 800,
            fontSize: "2rem",
            letterSpacing: 0,
        },
        h2: {
            fontWeight: 800,
            fontSize: "1.5rem",
            letterSpacing: 0,
        },
        h3: {
            fontWeight: 800,
            fontSize: "1.375rem",
            letterSpacing: 0,
        },
        h4: {
            fontWeight: 800,
            fontSize: "1.25rem",
            letterSpacing: 0,
        },
        h5: {
            fontWeight: 800,
            fontSize: "1.125rem",
            letterSpacing: 0,
        },
        h6: {
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: 0,
        },
        subtitle1: {
            letterSpacing: 0,
        },
        subtitle2: {
            letterSpacing: 0,
        },
        body1: {
            letterSpacing: 0,
        },
        body2: {
            letterSpacing: 0,
        },
        button: {
            letterSpacing: 0,
        },
        caption: {
            letterSpacing: 0,
        },
        overline: {
            letterSpacing: 0,
        },
        menuCaption: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.palette.grey[900],
            padding: '6px',
            textTransform: 'capitalize',
            marginTop: '10px'
        },
        subMenuCaption: {
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: theme.palette.text.secondary,
            textTransform: 'capitalize'
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '8px'
        },
        smallAvatar: {
            width: '22px',
            height: '22px',
            fontSize: '1rem'
        },
        mediumAvatar: {
            width: '34px',
            height: '34px',
            fontSize: '1.2rem'
        },
        largeAvatar: {
            width: '44px',
            height: '44px',
            fontSize: '1.5rem'
        },
        mainContent: {
            backgroundColor: theme.palette.background.default,
            width: '100%',
            minHeight: 'calc(100vh - 88px)',
            flexGrow: 1,
            padding: '20px',
            marginTop: '88px',
            marginRight: '20px',
            borderRadius: `${customization.borderRadius}px`
        },
    }
}