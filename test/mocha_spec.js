// Call 'mocha mocha_spec.js' to run
var should = require('should');
var data = require("./testlink_info.json");
var TestlinkConnect = require("./../lib/testlinkapi");

describe("Test testlink-connect", function() {
    var url = data.url + (data.port !== "" ? ":"+ data.port : "") + data.xmlrpb;
    var tc = new TestlinkConnect(data.apiKey, url);

    it("about",function(done){
        tc.about(function(callback){
            callback.string.should.not.equal(null);
            done();
        });
    });

    it("getDevKey",function(){
        tc.getDevKey().should.equal(data.apiKey);
    });

    it("getUrl",function(){
        tc.getUrl().should.equal(url);
    });

    describe("user methods",function(){

        it("doesUserExist",function(done){
            tc.doesUserExist({user: data.username },function(callback){
                callback.boolean.should.equal('1');
                done();
            });
        });

        it("getUserByLogin",function(done){
            tc.getUserByLogin({user: data.username },function(callback){
                callback.struct.login.should.equal(data.username);
                done();
            });
        });

        it("getUserByID",function(done){
            tc.getUserByID({userid: data.userid },function(callback){
                callback.struct.dbID.should.equal(data.userid);
                done();
            });
        });

    });
    //console.log(callback);
    describe("project methods",function(){

        it("getProjects",function(done){
            done();//NOTE: This test takes around 24 seconds
            this.timeout(25 * 1000);
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

    describe("test plan methods",function(){

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


});
