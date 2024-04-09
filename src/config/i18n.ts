import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';
import {initReactI18next} from "react-i18next";
import {getPath} from "@/utils/getEnv";

const publicPath = getPath()

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        detection: {
            order: ['querystring', 'navigator', 'localStorage'],
            lookupQuerystring: 'lang',
        },
        backend: {
            loadPath: `${publicPath}/src/assets/locales/{{lng}}/translation.json`,
        },
        fallbackLng: "en-US",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        supportedLngs: ["en-US", "zh-CN", "fr", "ja"],
    })
export default i18n
