const format = require("string-format");

const locales = ["en", "ko"];

module.exports = {
  locales,
  getLocaleFromCommand: function (name, command) {
    let result;
    name.forEach((text, index) => {
      if (text === command) {
        result = locales[index];
      }
    });
    return result;
  },
  getStr: function (locale, key, object = {}) {
    return format(require(`../language/${locale}.js`)[key], object);
  },
};
