const ModelOperations = require('../db/modelOperations');
const Generator = require('../utils/hashGenerator');

class UrlShorteningService {
    constructor() {
        this.model = new ModelOperations();
        this.hashGenerator = new Generator();
        this.blackList = ['getByHash', 'insertRow', 'getByHash', 'redirect', 'api-docs' ];
    }



    async fetchByHash(req,res) {
        const response = await this.model.findByHash(req.params.hash);
        res.send(response);
    }

    async isUnique(newHash) {
        const reponse = await this.model.findByHash(newHash);
        return((reponse.length === 0) && !this.blackList.includes(newHash));
    }

    async redirectToLongUrl(req, res) {
        if(!this.blackList.includes(req.params.hash)) {
            const response = await this.model.getLongUrl(req.params.hash);
            res.redirect(response.rows[0].original_url);
        }
    }

    async shortenAndSave(req,res) {
        var hash = this.hashGenerator.generateHash(req.url);
        var recurse = 0;
        // try to generate new hash when collision occurs. Breaks after 30 itr
        while (recurse < 30 && !this.isUnique(hash)) {
            hash = this.hashGenerator.generateHash(req.url);
            recurse += 30;
            if (recurse > 30) {
                throw new Error('DataHandler::InsertRecord : Cannot generate unique hash from given url.');
            }
        }
        const payload = {
            url: req.url,
            hash: hash
        }
        const response = await this.model.insertRecord(payload);
        res.send(response);
    }

}

module.exports = UrlShorteningService;