var crypto = require('crypto');
const validator = require('validator');

class HashGenerator {
    validateUrl(url) {
        return validator.isURL(url);
    }
    /* generating 3 character hash for short url.
        input is given url, current timestamp (to increase the uniqueness)
        using MD5, we are getting 32 char long hash and then taking last few char
    */
    generateHash(url, hashLength=3) {
        if(this.validateUrl(url)) {
            var urlWithTS = url + process.hrtime(); // Time stamp in NS
            var hash = crypto.createHash('md5').update(urlWithTS).digest('hex');
            return hash.substring(hash.length-hashLength);
        } else{
            throw new Error(`Invalid URL found from generateHash:${url}`);
        }
    }
}

module.exports = HashGenerator;