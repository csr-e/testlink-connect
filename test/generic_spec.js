var should = require('should');
var data = require("./data.json");
var TestlinkConnect = require("./../lib/testlinkapi");
var url = data.url + (data.port !== "" ? ":"+ data.port : "") + data.xmlrpb;
var tc = new TestlinkConnect(data.apiKey, url);

describe("Generic Methods", function() {

    it("about",function(done){
        tc.about(function(resp){
            CheckOkResponse(resp, "");
            resp.string.should.not.equal(null);
            done();
        });
    });

    it("getDevKey",function(){
        tc.getDevKey().should.equal(data.apiKey);
    });

    it("getUrl",function(){
        tc.getUrl().should.equal(url);
    });

    it("getFullPath",function(done){
        var obj = { nodeid: data.testCaseId};
        tc.getFullPath(obj,function(resp){
            CheckOkResponse(resp, "");
            should.notEqual(resp.length, undefined, "Void response not expected from TestLink");
            resp.length.should.not.equal(0);
            done();
        });
    });

    it("getTestLinkVersion",function(done){
        tc.getTestLinkVersion(function(resp){
            resp.string.should.equal(data.testlinkVersion);
            done();
        });
    });

    /* Template
    it("method",function(done){
        var obj = {};
        tc.method(obj,function(callback){
            console.log(callback);
            done();
        });
    });
    */

    function CheckOkResponse(data, hint) {
        should.notEqual(data, null, "Not response received by testlink");
        if (data.struct && data.struct.code) {
            var hintText = hint ? ". Hint: " + hint : "";
            should.fail(0,0, "ERR MSG: [" + data.struct.message + "] - " + hintText);
         }
    }

});
