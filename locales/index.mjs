import texts from './texts.mjs';
function getText(locale, key) {
    return texts[locale][key] ? texts[locale][key] : texts['en'][key];
}
function getLangs(locale, locales, defaultLocale) {
    // Returning all available languages, except the current
    return locales.filter((lang) => lang !== locale);
}
export { getText, getLangs }