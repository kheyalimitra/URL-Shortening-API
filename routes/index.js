const express = require('express');
const controller = require('../controllers/urlShorteningController');
var router = express.Router();

router.get('/getByHash/:hash', (req, res) => {
    controller.fetchByHash(req, res);
});
router.get('/:hash', (req, res) => {
    controller.redirectToLongUrl(req, res);
});

router.post('/shortenURL', (req, res) => {
    controller.shortenAndSave(req.body, res);
});

module.exports = router;