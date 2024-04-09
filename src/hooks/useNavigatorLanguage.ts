import {useState} from "react";
import {useEventListener} from "@/hooks/useEventListener";


export interface NavigatorLanguageState {
    isSupported: boolean

    /**
     *
     * ISO 639-1 standard Language Code
     *
     * @info The detected user agent language preference as a language tag
     * (which is sometimes referred to as a "locale identifier").
     * This consists of a 2-3 letter base language tag that indicates a
     * language, optionally followed by additional subtags separated by
     * '-'. The most common extra information is the country or region
     * variant (like 'en-US' or 'fr-CA').
     *
     *
     * @see https://docs.dyspatch.io/localization/supported_languages/#:~:text=The%20code%20for%20English%20(United,%2D1%20Alpha%2D2%20standard.
     */
    language: string | undefined
}
export const useNavigatorLanguage = (): Readonly<NavigatorLanguageState> => {
    // get navigator
    const navigator = window?.navigator;

    // 查看当前浏览器是否支持language
    const isSupported = Boolean(navigator && 'language' in navigator);

    // 存储当前language
    const [language, setLanguage] = useState(navigator?.language);

    // 监听languagechange事件，如果有变化，就更新存储的language值
    useEventListener('languagechange', () => {
        if (navigator) {
            setLanguage(navigator.language);
        }
    });

    return {
        isSupported,
        language,
    };
};