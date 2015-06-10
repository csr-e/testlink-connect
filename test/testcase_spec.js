var should = require('should');
var data = require("./data.json");
var TestlinkConnect = require("./../lib/testlinkapi");
var url = data.url + (data.port !== "" ? ":"+ data.port : "") + data.xmlrpb;
var tc = new TestlinkConnect(data.apiKey, url);

describe("Testcase Methods", function() {

    it("getTestCase - testcaseid",function(done){
        var obj = {
            testcaseid:data.testCaseId
        };
        tc.getTestCase(obj,function(callback){
            callback.struct.testcase_id.should.equal(data.testCaseId);
            done();
        });
    });

    it("getTestCase - testcaseexternalid",function(done){
        var obj = { "testcaseexternalid":data.testCaseExternalId };
        tc.getTestCase(obj,function(callback){
            callback.struct.full_tc_external_id.should.equal(data.testCaseExternalId);
            done();
        });
    });

    it("createTestCase - block duplicate",function(done){
        var msg = "There\'s already a Test Case with this title (" + data.testCaseName + ")";

        this.timeout(25 * 1000);
        var obj = {
            testprojectid:data.testProjectId,
            testsuiteid:data.testSuiteId,
            testcasename:data.testCaseName,
            authorlogin:data.username,
            summary:data.testCaseSummary,
            executiontype:2,
            checkduplicatedname:true,
            actiononduplicatedname:0
        };
        tc.createTestCase(obj,function(callback){
            callback.struct._additionalInfo.msg.should.equal(msg);
            done();
        });
    });


    it("reportTCResult - tescase id",function(done){
        var obj = {
            user: data.username,
            testplanid: data.testPlanId,
            buildid: data.buildId,
            testcaseid: data.testCaseId,
            notes: "",
            status: "f"
        };
        tc.reportTCResult(obj,function(callback){
            callback.struct.message.should.equal("Success!");
            done();
        });
    });


    it("getLastExecutionResult - testcase id",function(done){
        var obj = {
            testplanid: data.testPlanId,
            testcaseid: data.testCaseId
        };
        tc.getLastExecutionResult(obj,function(callback){
            callback.struct.status.should.equal("f");
            done();
        });
    });

    it("reportTCResult - testcase external id",function(done){
        var obj = {
            user: data.username,
            testplanid: data.testPlanId,
            buildid: data.buildId,
            testcaseexternalid:data.testCaseExternalId,
            notes: "",
            status: "p",
            overwrite: "true"
        };
        tc.reportTCResult(obj,function(callback){
            callback.struct.message.should.equal("Success!");
            done();
        });
    });

    it("getLastExecutionResult - testcase external id",function(done){
        var obj = {
            testplanid: data.testPlanId,
            testcaseexternalid:data.testCaseExternalId,
        };
        tc.getLastExecutionResult(obj,function(callback){
            callback.struct.status.should.equal("p");
            done();
        });
    });

    it("getTestCaseIDByName",function(done){
        var obj = {
            testcasename: data.testCaseName,
        };
        tc.getTestCaseIDByName(obj,function(callback){
            callback.struct.id.should.equal(data.testCaseId);
            done();
        });
    });



});
