export interface CountryType {
    code: string;
    label: string;
    phone: string;
    languageCode: string
    translation: string
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
export const countries: readonly CountryType[] = [
    {code: 'CN', label: 'China', phone: '86', languageCode: "zh-CN", translation: "settings.drawer.language.options.zh-CN"},
    {code: 'US', label: 'United States', phone: '1', languageCode: "en-US", translation: "settings.drawer.language.options.en-US"},
    {code: 'FR', label: 'France', phone: '33', languageCode: "fr", translation: "settings.drawer.language.options.fr"},
    {code: 'JP', label: 'Japan', phone: '81', languageCode: "ja", translation: "settings.drawer.language.options.ja"},
];