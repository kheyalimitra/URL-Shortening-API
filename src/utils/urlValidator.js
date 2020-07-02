const validator = require('validator');

module.exports = {
    validateUrl: (url) => {
        return validator.isURL(url);
    }
}
