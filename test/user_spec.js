var should = require('should');
var data = require("./data.json");
var TestlinkConnect = require("./../lib/testlinkapi");
var url = data.url + (data.port !== "" ? ":"+ data.port : "") + data.xmlrpb;
var tc = new TestlinkConnect(data.apiKey, url);

describe("User Methods", function() {

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
