/* eslint-disable */
import axios, {AxiosResponse} from "axios";
import {TypeBackground} from "@mui/material/styles/createPalette";

declare module 'ua-parser-js';

declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
    VITE_PUBLIC_URL: string
    VITE_API_URL: string
    VITE_PORT: number
    VITE_OPEN: boolean
    VITE_GLOB_APP_TITLE: string
    VITE_DROP_CONSOLE: boolean
    VITE_PROXY_URL: string
    VITE_BUILD_GZIP: boolean
    VITE_REPORT: boolean
}

export type ThemeLayoutType = "ltr" | "rtl";
export type SidebarDrawerType = "full" | "mini";
export type ThemeModeType = "dark" | "light";

declare interface Customization {
    isOpen: number[]
    themeMode: ThemeModeType
    inputBackground: string
    themeWidth: "full" | "half"
    themeLayout: ThemeLayoutType
    sidebarDrawer: SidebarDrawerType
    fontStyle: string
    borderRadius: number
    menuOrientation: "top" | "left"
    contrastThreshold: number
    themeType: string
}


declare module '@mui/material/styles' {
    interface Palette {
        orange: Palette['primary'];
    }

    interface PaletteOptions {
        orange?: PaletteOptions['primary'];
    }

    interface PaletteColor {
        lighter?: string,
        darker?: string;
    }

    interface SimplePaletteColorOptions {
        lighter?: string,
        darker?: string;
    }
}

// Update the Button's color options to include a salmon option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        orange: true;
    }
}
type AvatarType = {
    cursor: string,
    borderRadius: string,
    width: string,
    height: string,
    fontSize: string
}

type mainContentType = {
    backgroundColor: string,
    width: string,
    minHeight: string,
    flexGrow: number,
    padding: string,
    marginTop: string,
    marginRight: string,
    borderRadius: string
}
type menuCaptionType = {
    fontSize: string,
    fontWeight: number,
    color: string,
    padding: string,
    textTransform: string,
    marginTop: string
}

declare module '@mui/material/styles' {
    interface TypographyVariants {
        commonAvatar: Partial<AvatarType>
        smallAvatar: Partial<AvatarType>
        mediumAvatar: Partial<AvatarType>
        largeAvatar: Partial<AvatarType>
        mainContent: Partial<mainContentType>
        menuCaption: Partial<menuCaptionType>
        subMenuCaption: Partial<menuCaptionType>
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        commonAvatar: Partial<AvatarType>
        smallAvatar: Partial<AvatarType>
        mediumAvatar: Partial<AvatarType>
        largeAvatar: Partial<AvatarType>
        mainContent: Partial<mainContentType>
        menuCaption: Partial<menuCaptionType>
        subMenuCaption: Partial<menuCaptionType>
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        commonAvatar: Partial<AvatarType>
        smallAvatar: Partial<AvatarType>
        mediumAvatar: Partial<AvatarType>
        largeAvatar: Partial<AvatarType>
        mainContent: Partial<mainContentType>
        menuCaption: Partial<menuCaptionType>
        subMenuCaption: Partial<menuCaptionType>
    }
}

declare module 'axios' {
    interface IAxios<D = null> {
        code: string
        message: string
        extra: D
    }

    export interface AxiosResponse<T = any> extends IAxios<D> {
    }
}

