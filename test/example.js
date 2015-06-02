var TestlinkConnect = require("./../lib/testlinkapi");
var infoFilePath = "./testlink_info.json";
var testlinkInfo = require(infoFilePath);

if (testlinkInfo.url === ""){
    return console.log("Fill in the file '" + infoFilePath + "' to test connection.");
}
var url = testlinkInfo.url;
if(testlinkInfo.port !== "") { url += ":" + testlinkInfo.port; }
url += "/lib/api/xmlrpc/v1/xmlrpc.php";

var testlink = new TestlinkConnect(testlinkInfo.apiKey, url);
console.log(testlink);

var json = {
        user: "",
        testplanid: "",
        buildid: "",
        testcaseid: "",
        notes: "",
        status: ""
    };
var callbackFunction = function(callback){
    console.log("TestCase:" + json.testcaseid + "-",callback);
    return callback;
};
return testlink.reportTCResult(json,callbackFunction);


//In the future use http://demo.testlink.org/latest/login.php
