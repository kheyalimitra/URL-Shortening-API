'use strict'
const generator = require('../controllers/hashGenerator');
const expect = require('chai').expect;

describe('Controller module', () => {
    describe('"generateHash"', () => {
        it('should generate new hash for long url', () => {
            expect(generator.generateHash('')).to.equal('');
        });
    });
})


