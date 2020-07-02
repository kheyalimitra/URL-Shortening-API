let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../../app");
const { expect } = require("chai");
let should = chai.should();
chai.use(chaiHttp);


describe("UrlShortening", function(){
    describe ("/shortenAndSave", function(){
        it("should shorten the original url and save to table", done => {
            chai.request(server)
                .post("/api/shortenURL")
                .send({"url": "http://somewebsite.com"})
                .end((err,res) => {
                    res.body.should.be.a('object');
                    res.text.should.include("id");
                    res.text.should.include("shortened_url");
                    done();
                })
        });
        it ("Should Fecth record based on hash value", (done) => {
            chai.request(server)
                .get("/api/getByHash/2a1")
                .end((err, res) => {
                    res.body.should.be.a('array');
                    res.text.should.include("id");
                    res.text.should.include("shortened_url");
                    done();
            })
        });

    })
})