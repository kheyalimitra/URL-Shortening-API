'use strict'
const generator = require('../utils/hashGenerator');
const expect = require('chai').expect;

describe('Controller module', () => {
    describe('"generateHash"', () => {
        it('should generate no hash for invalid url', () => {
            expect(function() {
                generator.generateHash('fkjwkjwkrw')
            }).to.throw('Invalid URL found from generateHash:fkjwkjwkrw');
        });
        it('should generate new hash for long url every time', () => {
            const oldHash = generator.generateHash('https://www.example.com:777/a/b?c=d&e=f#g');
            const newHash = generator.generateHash('https://www.example.com:777/a/b?c=d&e=f#g');
            expect(oldHash).not.to.equal(newHash);
        });
        it('should generate new hash of length 3', () => {
            const hash = generator.generateHash('https://www.example.com:777/a/b?c=d&e=f#g');
            expect(hash.length).to.be.equal(3);
        });
        it('should not generate hash from blacklisted words', () => {
            const blackList = ['getAll', 'insertRow', 'getByHash', 'redirect' ];
            const hash = generator.generateHash('https://www.example.com:777/a/b?c=d&e=f#g');
            expect(blackList.includes(hash)).to.be.false;
        });
    });
})


