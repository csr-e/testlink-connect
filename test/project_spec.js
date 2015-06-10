var should = require('should');
var data = require("./data.json");
var TestlinkConnect = require("./../lib/testlinkapi");
var url = data.url + (data.port !== "" ? ":"+ data.port : "") + data.xmlrpb;
var tc = new TestlinkConnect(data.apiKey, url);

describe("Project Methods", function() {

    it("getProjects",function(done){
        //NOTE: This test takes around 24 seconds
        this.timeout(30 * 1000);
        tc.getProjects(function(callback){
            callback.length.should.not.equal(0);
            done();
        });
    });

    it("getProjectTestPlans",function(done){
        var obj = { "testprojectid":data.testProjectId };
        tc.getProjectTestPlans(obj,function(callback){
            callback.length.should.not.equal(0);
            done();
        });
    });

});
