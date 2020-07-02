const model = require('../models/crudOperations');
const hashGenerator = require('../utils/hashGenerator');

const isUnique = (newHash) => {
    return(model.isExist(newHash));
}

module.exports = {
    createTable: (req,res) => {
       const response=model.createTable(req);
       res.send(response);
    },
    fetchByHash: (req,res) => {
        const response=model.fetchByHash(req);
        res.send(response);
    },
    fetchRecords: (req,res) => {
       const response = model.fetchrecords();
       res.send(response);
    },

    InsertRecord: (req,res) => {
        debugger;
        console.log(req.body['url']);
        var hash = hashGenerator.generateHash(req.body['url']);
        const domain = req.body['domain'] || 'https://url-shorten.io';
        var recurse = 0;
        // try to generate new hash when collision occurs. Breaks after 30 itr
        while (recurse < 30 && !isUnique(hash)) {
            hash = hashGenerator.generateHash(req.body['url']);
            recurse += 30;
        }
        if(recurse > 30 || !isUnique(hash)) {
            throw new Error('DataHandler::InsertRecord : Cannot generate unique hash from given url.');
        } else {
            const payload = {
                url: url,
                hash: hash,
                shortUrl: `${domain}/${hash}`
            }
            const response = model.insertRecord(payload);
            res.send(response);
        }
        
    }

   }