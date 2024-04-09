import {immer} from "zustand/middleware/immer";
import {devtools, persist} from "zustand/middleware";
import {createWithEqualityFn} from "zustand/traditional";
import {shallow} from "zustand/shallow";
import {Customization, SidebarDrawerType, ThemeLayoutType, ThemeModeType} from "@/typings/global";

const customSetting: Customization = {
    isOpen: [],
    themeMode: "light",
    inputBackground: "#f8fafc",
    themeWidth: "full",
    themeLayout: "ltr",
    sidebarDrawer: "full",
    fontStyle: "Roboto, sans-serif",
    borderRadius: 8,
    menuOrientation: "left",
    contrastThreshold: 4.5,
    themeType: "general"
};

export const useCustomSettingStore = createWithEqualityFn<typeof customSetting>()(
    immer(
        devtools(
            persist(() => customSetting, {
                name: "custom theme setting",
            }),
            {
                enabled: true,
                name: "custom theme setting",
            }
        )
    ),
    shallow
);


export const changeThemeMode = (mode: ThemeModeType) => {
    useCustomSettingStore.setState((state) => {
        state.themeMode = mode
    })
}

export const changeThemeLayout = (direction: ThemeLayoutType) => {
    useCustomSettingStore.setState((state) => {
        state.themeLayout = direction
    })
}

export const changeBorderRadius = (borderRadius: number) => {
    useCustomSettingStore.setState((state) => {
        state.borderRadius = borderRadius
    })
}

export const changeFontStyle = (fontStyle: string) => {
    useCustomSettingStore.setState((state) => {
        state.fontStyle = fontStyle
    })
}

export const changeSidebarDrawer = (sidebarDrawer: SidebarDrawerType) => {
    useCustomSettingStore.setState((state) => {
        state.sidebarDrawer = sidebarDrawer
    })
}

export const navigation2Defeat = () => {
    useCustomSettingStore.setState((state) => {
        state.isOpen = [-1]
    })
}


