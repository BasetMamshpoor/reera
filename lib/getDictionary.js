export const getDictionary = async (locale) => {
    return import(`../dictionaries/${locale}.json`).then((module) => module.default);
};
