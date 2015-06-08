var should = require('should');
var data = require("./data.json");
var TestlinkConnect = require("./../lib/testlinkapi");
var url = data.url + (data.port !== "" ? ":"+ data.port : "") + data.xmlrpb;
var tc = new TestlinkConnect(data.apiKey, url);

describe("Testcase Methods", function() {
    /* Template
    it("method",function(done){
        var obj = {};
        tc.method(obj,function(callback){
            console.log(callback);
            done();
        });
    });
    */

    it("getTestCase - testcaseid",function(done){
        var obj = { testcaseid:"115885" }; //TODO Update data file
        tc.getTestCase(obj,function(callback){
//            console.log(callback);
            done();
        });
    });

    it("getTestCase - testcaseexternalid",function(done){
        var obj = { testcaseexternalid:"--1" }; //TODO Update data file
        tc.getTestCase(obj,function(callback){
            //console.log(callback);
            done();
        });
    });


    it("createTestCase -block duplicate",function(done){
        //done();//Not working as planned yet
        this.timeout(25 * 1000);
        var obj = {
            testprojectid:data.testProjectId,
            testsuiteid:"115884", //TODO Update data file
            testcasename:"Jason Test Create 2",
            authorlogin:data.username,
            summary:"Test that creating testcase work",
            execution:0
            //checkduplicatedname:true,
            //actiononduplicatedname:0
        };
        tc.createTestCase(obj,function(callback){
            //console.log(callback);
            done();
        });
    });




});
