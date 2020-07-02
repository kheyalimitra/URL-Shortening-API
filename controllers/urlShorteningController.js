const model = require('../models/crudOperations');
const hashGenerator = require('../utils/hashGenerator');

const isUnique = async (newHash) => {
    const blackList = ['getAll', 'insertRow', 'getByHash', 'redirect' ];
    const reponse = await model.findByHash(newHash);
    return((reponse.length === 0) && !blackList.includes(newHash));
}

module.exports = {
    fetchByHash: async(req,res) => {
        const response = await model.findByHash(req.params.hash);
        res.send(response);
    },

    // fetchAllRecords: (req,res) => {
    //    const response = model.fetchrecords();
    //    res.send(response);
    // },

    redirectToLongUrl: async (req, res) => {
        const response = await model.getLongUrl(req.params.hash);
        res.redirect(response.rows[0].long_url);
    },

    shortenAndSave: async (req,res) => {
        var hash = hashGenerator.generateHash(req.url);
        var recurse = 0;
        // try to generate new hash when collision occurs. Breaks after 30 itr
        while (recurse < 30 && !isUnique(hash)) {
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
        const response = await model.insertRecord(payload);
        res.send(response);
    }
   }