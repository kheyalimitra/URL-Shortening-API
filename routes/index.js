const express = require('express');
const controller = require('../controllers/urlShorteningController');
var router = express.Router();

// router.get('/getByHash/:hash', dbHandler.fetchByHash);
// router.get('/redirect/:hash', dbHandler.fetchRecord());
router.get('/getAll', controller.fetchRecords);
router.post('/insertRow', (req, res) => {
    controller.InsertRecord;
});

module.exports = router;