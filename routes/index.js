const express = require('express');
const urls = require('./generateUrl');
const dbHandler=require('../controllers/dbHandler');
var router = express.Router();

// router.get('/getByHash/:hash', dbHandler.fetchByHash);
// router.get('/redirect/:hash', dbHandler.fetchRecord());
router.get('/getAll', dbHandler.fetchRecords);
// router.post('/insertRow', dbHandler.insertRecord);

module.exports = router;