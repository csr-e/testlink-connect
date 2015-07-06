var fs       = require('fs'),
	util     = require('util'),
	utilites = require('./utilities'),
	jsonPath = require('JSONPath');
	
var u = utilites;
module.exports=TestLinkApi=function(devkey,rpcUrl,callback){
	this.url=rpcUrl;
	this.devkey=devkey;
};

//Getting the parts
var files = [
	"./testcase_methods",
	"./project_methods",
	"./user_methods",
	"./testplan_methods",
	"./advanced_methods"
];
files.forEach(function(file){ require(file); });

/**
 * Retrieves Platforms Assigned for Project.
 *
 *	@method  getProjectPlatforms
 * 	@param 	{object} 	 testProjectId
 * 	@param  {function} 	 callback
 * 	@return	{Json Object}JSON Object for Project Platforms
 */
TestLinkApi.prototype.getProjectPlatforms = function(params, callback) {
    var obj = { methodName: "getProjectPlatforms" };
	addValueTypeObject(obj, "devKey", this.devkey, "string");
	addValueTypeObject(obj, "testprojectid", params.testprojectid, "int");
	postToAPI(this.url, obj, callback);
};

/**
 * Get attached files for a TestCase.
 *
 *	@method	getTestCaseAttachments
 * 	@param 	 {object}  testCaseExternalId
 * 	@param 	 {object}  downloadPath
 *	@param	 {function}callback
 */
TestLinkApi.prototype.getTestCaseAttachments = function(params, downloadpath, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestCaseAttachments",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testcaseexternalid: {
            value: params.testcaseexternalid || "testcaseexternalid",
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var attachments = utilites.getJsObjectByXmlResponse(response),
			component_names = jsonPath.eval(attachments, "$..name"),
			component_contents = jsonPath.eval(attachments, "$..content"),
			index = 0;
        component_contents.map(function(content) {
            var buf = new Buffer(content, 'base64');
            fs.writeFile(downloadpath + component_names[index++], buf, function(err) {
                if (err) throw err;
                console.log('File Has Been Downloaded');
				callback();
            });
        });
    });
};

/**
 * Retrieves Custom Field Design Value Created for TestCase.
 *
 *	@method  getTestCaseCustomFieldDesignValue
 *	@param 	{object}  	 testProjectId
 * 	@param 	{object}  	 testCaseExternalId
 * 	@param 	{object}  	 customFieldName
 * 	@param 	{object}  	 details
 * 	@param 	{object}  	 version
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestCase Custom field Value
 */
TestLinkApi.prototype.getTestCaseCustomFieldDesignValue = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestCaseCustomFieldDesignValue",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testcaseexternalid: {
            value: params.testcaseexternalid || "testcaseexternalid",
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid || "testprojectid",
            type: "int"
        },
		customfieldname: {
		    value: params.customfieldname || "customfieldname",
		    type: "string"
		},
        details: {
            value: params.details || "details",
            type: "string"
        },
        version: {
            value: params.version || "version",
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var customFieldValue = utilites.getJsObjectByXmlResponse(response);
        callback(customFieldValue);
    });
};

/**
 * Retrieves Created TestCase(s) for a TestSuite
 *
 *	@method	getTestCasesForTestSuite
 *	@param 	{object}	 testProjectId
 *	@param 	{object}	 testSuiteId
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestCases(s)
 */
TestLinkApi.prototype.getTestCasesForTestSuite = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestCasesForTestSuite",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid || "testprojectid",
            type: "int"
        },
        testsuiteid: {
            value: params.testsuiteid || "testsuiteid",
            type: "int"
        },
        deep: {
            value: params.deep || "deep",
            type: "boolean"
        },
        details: {
            value: params.details || "details",
            type: "string"
        },
        getkeywords: {
            value: params.getkeywords || "getkeywords",
            type: "boolean"
        },
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var getsuites = utilites.getJsObjectByXmlResponse(response);
        callback(getsuites);
    });
};

/**
 * Retrieves Platforms Assigned for TestPlan
 *
 *	@method	getTestPlanPlatforms
 *	@param 	{object}	 testPlanId
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for Platform
 */
TestLinkApi.prototype.getTestPlanPlatforms = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestPlanPlatforms",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid || "testplanid",
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var platforms = utilites.getJsObjectByXmlResponse(response);
        callback(platforms);
    });
};

/**
 * Retrieves TestProject and its Properties
 *
 *	@method	getTestProjectByName
 *	@param 	{object}	 testProjectName
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for Project
 */
TestLinkApi.prototype.getTestProjectByName = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestProjectByName",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectname: {
            value: params.testprojectname || "testprojectname",
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var projectName = utilites.getJsObjectByXmlResponse(response);
        callback(projectName);
    });
};

/**
 * Retrieves TestSuites created for TestPlan(s)
 *
 *	@method	getTestSuitesForTestPlan
 *	@param 	{object}	 testPlanId
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestSuite
 */
TestLinkApi.prototype.getTestSuitesForTestPlan = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestSuitesForTestPlan",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid || "testplanid",
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var testSuites = utilites.getJsObjectByXmlResponse(response);
        callback(testSuites);
    });
};

/**
 * Retrieves Child TestSuite(s) created under a TestSuite(s)
 *
 *	@method	getTestSuitesForTestSuite
 *	@param 	{object}	 testSuiteId
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestSuite
 */
TestLinkApi.prototype.getTestSuitesForTestSuite = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestSuitesForTestSuite",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testsuiteid: {
            value: params.testsuiteid || "testsuiteid",
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var testsuites = utilites.getJsObjectByXmlResponse(response);
        callback(testsuites);
    });
};

/**
 * Uploads a Given file to TestCase
 *
 *	@method	uploadTestCaseAttachment
 *	@param 	{object}  testCaseId
 *	@param 	{object}  fileName
 * 	@param 	{object}  uploadPath
 *	@param	{function}callback
 */
TestLinkApi.prototype.uploadTestCaseAttachment = function(params, callback) {
    var post = utilites.postCompose(this.url),
		bitmap = fs.readFileSync(params.uploadpath + params.filename),
		content = new Buffer(bitmap).toString('base64'),
		inputObject = {
        methodName: "uploadTestCaseAttachment",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testcaseid: {
            value: params.testcaseid || "testcaseid",
            type: "int"
        },
        title: {
            value: params.title || "title",
            type: "string"
        },
        filename: {
            value: params.filename || "title",
            type: "string"
        },
        content: {
            value: content || "title",
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {});
	callback();
};

/*To Get DevKey
 *
 *	@method	getDevKey
 *	@param	{function}callback
 *
*/
TestLinkApi.prototype.getDevKey = function(callback) {
    return this.devkey;
};

/*To Get the URL
 *
 *	@method getUrl
 *	@param {function}callback
 *
*/
TestLinkApi.prototype.getUrl = function(callback) {
    return this.url;
};

/**
 * Retrieves Execution Counters for Build
 *
 *	@method getExecCountersByBuild
 *	@param 	{object}	 testPlanId
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for Execution Counters
 */
TestLinkApi.prototype.getExecCountersByBuild = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getExecCountersByBuild",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid || "testplanid",
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var execCounters = utilites.getJsObjectByXmlResponse(response);
        callback(execCounters);
    });
};

/**
 * Retrieves First Level of TestSuites in a Project
 *
 *	@method getFirstLevelTestSuitesForTestProject
 *	@param 	{object}	 testProjectId
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestSuite
 */
TestLinkApi.prototype.getFirstLevelTestSuitesForTestProject = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getFirstLevelTestSuitesForTestProject",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid || "userid",
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var firstLevelSuite = utilites.getJsObjectByXmlResponse(response);
        callback(firstLevelSuite);
    });
};
/**
 * Retrieves Full Path for a Node
 *
 *	@method getFullPath
 *	@param 	{object}     nodeId
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for FullPath
 */
TestLinkApi.prototype.getFullPath = function(params, callback) {
	var	obj = { methodName: "getFullPath" };
	addValueTypeObject(obj, "devKey", this.devkey, "string");
	addValueTypeObject(obj, "nodeid", params.nodeid, "int");
	postToAPI(this.url, obj, callback);
};

/**
 * Retrieves Last Execution Result for a TestCase
 *
 *	@method	getLastExecutionResult
 *	@param 	{object}	 testPlanId
 *	@param 	{object} 	 testCaseExternalId || testCaseId
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for Last Execution Result
 */
TestLinkApi.prototype.getLastExecutionResult = function(params, callback) {
	var	obj = { methodName: "getLastExecutionResult" };
	addValueTypeObject(obj, "devKey", this.devkey, "string");
	addValueTypeObject(obj, "testplanid", params.testplanid, "int");
	addValueTypeObjectChoices(obj, "testcaseexternalid", params.testcaseexternalid, "testcaseid", params.testcaseid, "string");
	postToAPI(this.url, obj, callback);
};

/**
 * Un-Assign a Platform for a given TestPlan
 *
 *	@method removePlatformFromTestPlan
 *	@param 	{object}	 testPlanId
 *	@param 	{object}	 platformName
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for a PlatformTestPlan
 */
TestLinkApi.prototype.removePlatformFromTestPlan = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "removePlatformFromTestPlan",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid || "testplanid",
            type: "int"
        },
        platformname: {
            value: params.platformname || "platformname",
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var removeplatform = utilites.getJsObjectByXmlResponse(response);
        callback(removeplatform);
    });
};

/**
 * Update Result for a given TestCase.
 *
 *	@method	reportTCResult
 *	@param 	{object}	 testPlanId
 *	@param 	{object} 	 testCaseExternalId || testCaseId
 *	@param 	{object}	 buildId
 *	@param 	{object}	 notes
 *	@param 	{object}	 status
 *	@param 	{object}	 platformName
 *	@param 	{object}	 user
 *	@param 	{object}	 bugId
 *	@param 	{object}	 overwrite (optional)
 *	@param 	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCase Result
 */
TestLinkApi.prototype.reportTCResult = function(params, callback) {
	var	obj = { methodName: "reportTCResult" };
	addValueTypeObject(obj, "devKey", this.devkey, "string");
	addValueTypeObject(obj, "testplanid", params.testplanid, "int");
	addValueTypeObjectChoices(obj, "testcaseexternalid", params.testcaseexternalid, "testcaseid", params.testcaseid, "string");
	addValueTypeObject(obj, "buildid", params.buildid, "string");
	addValueTypeObject(obj, "notes", params.notes, "string");
	addValueTypeObject(obj, "status", params.status, "string");
	addValueTypeObject(obj, "platformname", params.platformname, "string");
	addValueTypeObject(obj, "user", params.user, "string");
	addValueTypeObject(obj, "bugid", params.bugid, "string");
	optionalAddValueTypeObject(obj, "overwrite", params.overwrite, "boolean");
	postToAPI(this.url, obj, callback);
};

/**
 * Unnecessary should depricate
 */
TestLinkApi.prototype.reportTCResultOverwrite = function(params, callback) {
	console.log("Function 'reportTCResultOverwrite' to be depricated. Use 'reportTCResult' with parameter 'overwrite'." );
	this.reportTCResult(params, callback);
};

/**
 * 	Set the Execution Type for a given TestCase.
 *
 *	@method	setTestCaseExecutionType
 *	@param 	{object}	 testProjectId
 *	@param 	{object}	 testCaseExternalId
 *	@param 	{object}	 executionType
 *	@param 	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCase Execution Type
 */
TestLinkApi.prototype.setTestCaseExecutionType = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "setTestCaseExecutionType",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid || "testprojectid",
            type: "int"
        },
        testcaseexternalid: {
            value: params.testcaseexternalid || "testcaseexternalid",
            type: "string"
        },
        version: {
            value: params.version || "version",
            type: "int"
        },
        executiontype: {
            value: params.executiontype || "executiontype",
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var removeplatform = utilites.getJsObjectByXmlResponse(response);
        callback(removeplatform);
    });
};

/**
 * 	Retrieves TestList Version.
 *
 *	@method	getTestLinkVersion
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for version
 */
TestLinkApi.prototype.getTestLinkVersion = function(callback) {
	var	obj = { methodName: "testLinkVersion" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.postToAPI(this.url, obj, callback);
};

/**
 * 	Update TestCase Version and Summary.
 *
 *	@method	updateTestCase
 *	@param	{object}	 testCaseExternalId
 *	@param	{object}	 version
 *	@param	{object}	 summary
 *	@param	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCase
 */
TestLinkApi.prototype.updateTestCase = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "updateTestCase",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testcaseexternalid: {
            value: params.testcaseexternalid || "testcaseexternalid",
            type: "string"
        },
        version: {
            value: params.version || "version",
            type: "int"
        },
        summary: {
            value: params.summary || "summary",
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var updatetc = utilites.getJsObjectByXmlResponse(response);
        callback(updatetc);
    });
};

/**
 * 	Update TestCase Custom Field Design Values.
 *
 *	@method	updateTestCaseCustomFieldDesignValue
 *	@param 	{object}	 testProjectId
 *	@param 	{object}	 testCaseExternalId
 *	@param 	{object}	 version
 *	@param 	{object}	 customFieldName
 *	@param 	{object}	 customFieldValue
 *	@param 	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCase
 */
TestLinkApi.prototype.updateTestCaseCustomFieldDesignValue = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "updateTestCaseCustomFieldDesignValue",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid || "testprojectid",
            type: "int"
        },
        testcaseexternalid: {
            value: params.testcaseexternalid || "testcaseexternalid",
            type: "int"
        },
        version: {
            value: params.version || "version",
            type: "string"
        },
        customfields: [{
            name: params.custonfiledname || "custonfiledname",
            value: params.custonfiledvalue || "custonfiledvalue",
            type: "String"
        }]
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var customfiled = utilites.getJsObjectByXmlResponse(response);
        callback(customfiled);
    });
};


TestLinkApi.prototype.about = function(callback) {
	var	obj = { methodName: "about" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.postToAPI(this.url, obj, callback);
};


var postToAPI = function(url, object, callback){
	var post = utilites.postCompose(url),
		body = utilites.getRequestByObject(object);

	utilites.postRequest(post, body, function(response) {
	    callback(utilites.getJsObjectByXmlResponse(response));
	});
};

var addValueTypeObject = function(object, key, valueVariable, objectType){
	object[key] = { value: valueVariable || key, type : objectType};
};

var addValueTypeObjectChoices = function(object, mainKey, mainValueVariable, backupKey, backupValueVariable, objectType){
	if(mainValueVariable !== undefined){
		addValueTypeObject(object, mainKey, mainValueVariable, objectType);
	}else{
		addValueTypeObject(object, backupKey, backupValueVariable, objectType);
	}
};

var optionalAddValueTypeObject = function(object, key, valueVariable, objectType){
	if(valueVariable !== undefined){
		addValueTypeObject(object, key, valueVariable, objectType);
	}
};
