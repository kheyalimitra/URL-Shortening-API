const ModelOperations = require('../db/crudOperations');
const hashGenerator = require('../utils/hashGenerator');

class UrlShorteningService {
    constructor() {
        this.model = new ModelOperations();
    }

    async fetchByHash(req,res) {
        const response = await this.model.findByHash(req.params.hash);
        res.send(response);
    }

    async isUnique(newHash) {
        const blackList = ['getAll', 'insertRow', 'getByHash', 'redirect' ];
        const reponse = await this.model.findByHash(newHash);
        return((reponse.length === 0) && !blackList.includes(newHash));
    }

    async redirectToLongUrl(req, res) {
        const response = await this.model.getLongUrl(req.params.hash);
        res.redirect(response.rows[0].original_url);
    }

    async shortenAndSave(req,res) {
        var hash = hashGenerator.generateHash(req.url);
        var recurse = 0;
        // try to generate new hash when collision occurs. Breaks after 30 itr
        while (recurse < 30 && !this.isUnique(hash)) {
            hash = hashGenerator.generateHash(req.url);
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
// const isUnique = async (newHash) => {
//     const blackList = ['getAll', 'insertRow', 'getByHash', 'redirect' ];
//     const reponse = await this.model.fetchByHash(newHash);
//     return((reponse.length === 0) && !blackList.includes(newHash));
// }

// module.exports = {
//     fetchByHash: async(req,res) => {
//         const response = await this.model.findByHash(req.params.hash);
//         res.send(response);
//     },

//     redirectToLongUrl: async (req, res) => {
//         const response = await this.model.getLongUrl(req.params.hash);
//         res.redirect(response.rows[0].long_url);
//     },

//     shortenAndSave: async (req,res) => {
//         // console.log(req);
//         var hash = hashGenerator.generateHash(req.url);
//         var recurse = 0;
//         // try to generate new hash when collision occurs. Breaks after 30 itr
//         while (recurse < 30 && !isUnique(hash)) {
//             hash = hashGenerator.generateHash(req.url);
//             recurse += 30;
//             if (recurse > 30) {
//                 throw new Error('DataHandler::InsertRecord : Cannot generate unique hash from given url.');
//             }
//         }
//         const payload = {
//             url: req.url,
//             hash: hash
//         }
//         const response = await this.model.insertRecord(payload);
//         res.send(response);
//     }
//    }
module.exports = UrlShorteningService;