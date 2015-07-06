var u = require('./utilities');

/**
 * Retrieves Created TestCase based on External Id.
 *
 *	@method	getTestCase
 * 	@param  {function}	 callback
 *  @param 	{object} 	 testCaseExternalId || testCaseId
 * 	@return	{Json Object}JSON Object for TestCase
 */
TestLinkApi.prototype.getTestCase = function(params, callback) {
	var obj = { methodName: "getTestCase" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
    u.addValueTypeObjectChoices(obj, "testcaseexternalid", params.testcaseexternalid, "testcaseid", params.testcaseid, "string");
    u.postToAPI(this.url, obj, callback);
};

/**
* Create a new test case
*
*	@method	createTestCase
*	@param 	{object}	 testProjectId
*	@param 	{object}	 testSuiteId
*	@param 	{object}	 testCaseName
*	@param	{object}	 authorLogin
*	@param	{object}	 summary
*	@param	{object}	 steps
*	@param	{object}	 execution (optional)
*	@param	{object}	 checkDuplicatedName (optional)
*	@param	{object}	 actionOnDuplicatedName (optional)
*
* NOTE: steps currently doesn't work
* TODO: figure out execution
*/
TestLinkApi.prototype.createTestCase = function(params, callback) {
	var	obj = { methodName: "createTestCase" };
    u.addValueTypeObject(obj, "devKey", this.devkey, "string");
    u.addValueTypeObject(obj, "testprojectid", params.testprojectid, "int");
    u.addValueTypeObject(obj, "testsuiteid", params.testsuiteid, "int");
    u.addValueTypeObject(obj, "testcasename", params.testcasename, "string");
    u.addValueTypeObject(obj, "authorlogin", params.authorlogin, "string");
    u.addValueTypeObject(obj, "summary", params.summary, "string");
    u.addValueTypeObject(obj, "steps", params.steps, "string");
    u.optionalAddValueTypeObject(obj, "executiontype", params.executiontype, "int");
    u.optionalAddValueTypeObject(obj, "checkduplicatedname", params.checkduplicatedname, "boolean");
    u.optionalAddValueTypeObject(obj, "actiononduplicatedname", params.actiononduplicatedname, "int");
    u.postToAPI(this.url, obj, callback);
};

/**
 * Retrieves Created TestCase based on Id
 *
 *	@method	getTestCaseIDByName
 *	@param 	{object}	 testCaseName
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestCase
 */
TestLinkApi.prototype.getTestCaseIDByName = function(params, callback) {
	var obj = { methodName: "getTestCaseIDByName" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "testcasename", params.testcasename, "string");
	u.postToAPI(this.url, obj, callback);
};
