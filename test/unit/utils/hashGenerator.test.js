'use strict'
const HashGenerator = require('../../../src/utils/hashGenerator');
const expect = require('chai').expect;
const generator = new HashGenerator();

describe('Util module', () => {
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
    describe('"validateUrl"', () => {
        it('should validate long empty url', () => {
            expect(generator.validateUrl('')).to.false;
        });
        it('validate long special char url', () => {
            expect(generator.validateUrl('invalid=?^~*||<html>')).to.false;
        });
        
        it('validate long xss attacked url', () => {
            expect(generator.validateUrl("index.php?name=guest<script>alert('attacked')</script>')")).to.false;
        });
        
        it('validate long url- https', () => {
            expect(generator.validateUrl('https://www.example.com:777/a/b?c=d&e=f#g')).to.true;
        });
        it('validate long url- http', () => {
            expect(generator.validateUrl('http://www.example1.com:777/a/b?c=d&e=f#g')).to.true;
        });
        it('validate sql injection', () => {
            expect(generator.validateUrl('http://newspaper.com/items.php?id=2 and 1=2')).to.false;
        });
        
    });
})


