const model = require('../models/crudOperations');
module.exports = {
    createTable:function(req,res){
       const response=model.createTable(req);
       res.send(response);
    },
    fetchByHash:function(req,res){
        const response=model.fetchByHash(req);
        res.send(response);
    },
    fetchRecords:function(req,res){
       const response = model.fetchrecords();
       res.send(response);
    },

    InsertRecord:function(req,res){
        const response=model.insertRecord(req);
        res.send(response);
    }

   }