const express = require('express');
const UrlShorteningService = require('../../services/urlShorteningService');

var router = express.Router();
const service = new UrlShorteningService();

router.get('/getByHash/:hash', (req, res) => {
    service.fetchByHash(req, res);
});
router.get('/:hash', (req, res) => {
    service.redirectToLongUrl(req, res);
});

router.post('/shortenURL', (req, res) => {
    service.shortenAndSave(req.body, res);
});

module.exports = router;