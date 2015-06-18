var should = require('should');
var data = require("./data.json");
var TestlinkConnect = require("./../lib/testlinkapi");
var url = data.url + (data.port !== "" ? ":"+ data.port : "") + data.xmlrpb;
var tc = new TestlinkConnect(data.apiKey, url);

describe("Testplan Methods", function() {

    it("getTestPlanByName",function(done){
        var obj = {
            "testprojectname":data.testProjectName,
            "testplanname":data.testPlanName
        };
        tc.getTestPlanByName(obj,function(callback){
            callback.struct.id.should.equal(data.testPlanId);
            done();
        });
    });

    it("getBuildsForTestPlan",function(done){
        var obj = { "testplanid":data.testPlanId };
        tc.getBuildsForTestPlan(obj,function(callback){
            if( Object.prototype.toString.call( callback ) === '[object Array]' ) {
                callback.length.should.not.equal(0);
            }else{
                callback.should.not.equal(null);
            }
            done();
        });
    });

    it("getTestCasesForTestPlan",function(done){
        var obj = { "testplanid":data.testPlanId };
        tc.getTestCasesForTestPlan(obj,function(callback){
            callback.struct.tcase_name.should.equal(data.testCaseName);
            done();
        });
    });

    it("addTestCaseToTestPlan",function(done){
        var obj = {
            testprojectid:data.testProjectId,
            testplanid:data.testPlanId,
            testcaseid: data.testCaseId,
            version:1,
        };
        tc.addTestCaseToTestPlan(obj,function(callback){
            //console.log(callback);
            callback.struct.operation.should.equal("addTestCaseToTestPlan");
            done();
        });
    });

});
