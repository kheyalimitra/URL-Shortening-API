'use strict'
const validator = require('../controllers/urlValidator');
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
        
        it('validate long url', () => {
            expect(validator.validateUrl('https://www.example.com:777/a/b?c=d&e=f#g')).to.true;
        });
    })
})


