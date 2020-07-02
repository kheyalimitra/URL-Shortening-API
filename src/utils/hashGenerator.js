var crypto = require('crypto');
const validator = require('./urlValidator');

module.exports = {
    generateHash: (url) => {
        if(validator.validateUrl(url)) {
            var urlWithTS = url + process.hrtime(); // Time stamp in NS
            var hash = crypto.createHash('md5').update(urlWithTS).digest('hex');
            // Take last 3 digit
            return hash.substring(hash.length-3);
        } else{
            throw new Error(`Invalid URL found from generateHash:${url}`);
        }
    }
}