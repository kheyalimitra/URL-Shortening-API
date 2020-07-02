'use strict'
const validator = require('../../../src/utils/urlValidator');
const expect = require('chai').expect;

describe('Controller module', () => {
    describe('"validateUrl"', () => {
        it('should validate long empty url', () => {
            expect(validator.validateUrl('')).to.false;
        });
        it('validate long special char url', () => {
            expect(validator.validateUrl('invalid=?^~*||<html>')).to.false;
        });
        
        it('validate long xss attacked url', () => {
            expect(validator.validateUrl("index.php?name=guest<script>alert('attacked')</script>')")).to.false;
        });
        
        it('validate long url- https', () => {
            expect(validator.validateUrl('https://www.example.com:777/a/b?c=d&e=f#g')).to.true;
        });
        it('validate long url- http', () => {
            expect(validator.validateUrl('http://www.example1.com:777/a/b?c=d&e=f#g')).to.true;
        });
        it('validate sql injection', () => {
            expect(validator.validateUrl('http://newspaper.com/items.php?id=2 and 1=2')).to.false;
        });
        
    })
})


