const express = require('express');
const UrlShorteningService = require('../../services/urlShorteningService');

const router = express.Router();

const service = new UrlShorteningService();
/**
 * @swagger
 * /shortenURL:
 *   post:
 *     tags:
 *       - shortenURL
 *     description: Takes original URL and generates short url
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         description: Original url
 *         in: body
 *         required: true
 *         examples:
 *             application/json: { "url": "http://somewebsite.com" }

 *     responses:
 *       200:
 *         description: Success
 *         examples:
 *           application/json: { "id": 13, "shortened_url": "http://shorten.io/sY4", "original_url": "http://somewebsite.com" }

 */
router.post('/shortenURL', (req, res) => {
    service.shortenAndSave(req.body, res);
});
/**
 * @swagger
 * /getByHash/{hash}:
 *   get:
 *     tags:
 *       - getByHash
 *     description: Takes a URL hash and get url details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: hash
 *         description: hash value
 *         in: path
 *         required: true
 *         example:
 *           text/plain: "2a1"
 *     responses:
 *       200:
 *         description: OK
 *         examples:
 *           application/json: { "id": 1234, "shortened_url": "http://shorten.io/sY4", "original_url": "http://somewebsite.com" }
 *       400:
 *         description: Bad Request 
 */
router.get('/getByHash/:hash', (req, res) => {
    service.fetchByHash(req, res);
});
// /**
//  * @swagger
//  * /{hash}:
//  *   get:
//  *     tags:
//  *       - redirect
//  *     description: Takes short URL hash and redirect to the original url
//  *     produces:
//  *       - redirection
//  *     parameters:
//  *       - name: hash
//  *         description: hash value
//  *         in: path
//  *         required: true
//  *         type: string
//  *         example:
//  *          text/plain: "2a1"

//  *     responses:
//  *       302:
//  *         description: Redirect
//  */
router.get('/:hash', (req, res) => {
    service.redirectToLongUrl(req, res);
});
module.exports = router;