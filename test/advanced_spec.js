var should = require('should');
var data = require("./data.json");
var TestlinkConnect = require("./../lib/testlinkapi");
var url = data.url + (data.port !== "" ? ":"+ data.port : "") + data.xmlrpb;
var tc = new TestlinkConnect(data.apiKey, url);


describe("Advanced Functionality", function() {

    it("createTestCaseThenReport",function(done){
        this.timeout(10 * 1000);
        var obj = {
            testprojectid:data.testProjectId,
            testsuiteid:data.testSuiteId,
            testplanid:data.testPlanId,
            testcasename:"Advanced",
            authorlogin:data.username,
            summary:"This should be created and pass all at once.",
            execution:0,
            checkduplicatedname:true,
            actiononduplicatedname:0,
            version:1,
            user: data.username,
            notes: "",
            status: "p"
        };
        tc.createTestCaseThenReport(obj,function(callback){
            callback.struct.message.should.equal("Success!");
            done();
        });
    });

});
