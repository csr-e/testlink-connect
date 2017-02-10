var u = require('./utilities');

/**
 * Retrieves TestPlan and its Properties
 *
 *	@method	getTestPlanByName
 *	@param 	{object}	 testProjectName
 * 	@param 	{object}	 testPlanName
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestPlan
 */
TestLinkApi.prototype.getTestPlanByName = function(params, successCallbak, errCallback) {
	var obj = { methodName: "getTestPlanByName" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "testprojectname", params.testprojectname, "string");
	u.addValueTypeObject(obj, "testplanname", params.testplanname, "string");
	u.postToAPI(this.url, obj, successCallbak, errCallback);
};

/**
 * Retrieves Builds Created for TestPlan.
 *
 *	@method getBuildsForTestPlan
 * 	@param 	{object}	 testPlanId
 * 	@param 	{function} 	 callback
 * 	@return	{Json Object}JSON Object for Builds
 */
TestLinkApi.prototype.getBuildsForTestPlan = function(params, successCallbak, errCallback) {
	var	obj = { methodName: "getBuildsForTestPlan" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "testplanid", params.testplanid, "int");
	u.postToAPI(this.url, obj, successCallbak, errCallback);
};

/**
 * Retrieves Created TestCase(s) for a TestPlan
 *
 *	@method getTestCasesForTestPlan
 *	@param 	{object}	 testPlanId
 * 	@param 	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCases(s)
 */
TestLinkApi.prototype.getTestCasesForTestPlan = function(params, successCallbak, errCallback) {
	var obj = { methodName: "getTestCasesForTestPlan" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "testplanid", params.testplanid, "int");
	console.log(obj);
	u.postToAPI(this.url, obj, successCallbak, errCallback);
};

//TODO Documentation
TestLinkApi.prototype.addTestCaseToTestPlan = function(params, successCallbak, errCallback) {
	var	obj = { methodName: "addTestCaseToTestPlan" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "testplanid", params.testplanid, "int");
	u.addValueTypeObject(obj, "testprojectid", params.testprojectid, "int");
	u.addValueTypeObject(obj, "version", params.version, "int");
	u.addValueTypeObjectChoices(obj, "testcaseexternalid", params.testcaseexternalid, "testcaseid", params.testcaseid, "string");
	u.optionalAddValueTypeObject(obj, "platformId", params.platformId, "int");
	u.optionalAddValueTypeObject(obj, "order", params.order, "int");
	u.optionalAddValueTypeObject(obj, "urgency", params.urgency, "int");
	u.postToAPI(this.url, obj, successCallbak, errCallback);
};

TestLinkApi.prototype.getTotalsForTestPlan = function(params, successCallbak, errCallback) {
	var	obj = { methodName: "getTotalsForTestPlan" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "testplanid", params.testplanid, "int");
	u.postToAPI(this.url, obj, successCallbak, errCallback);
};

TestLinkApi.prototype.getLatestBuildForTestPlan = function(params, successCallbak, errCallback) {
	var	obj = { methodName: "getLatestBuildForTestPlan" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "testplanid", params.testplanid, "int");
	u.postToAPI(this.url, obj, successCallbak, errCallback);
};

TestLinkApi.prototype.createBuild = function(params, successCallbak, errCallback) {
	var	obj = { methodName: "createBuild" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "testplanid", params.testplanid, "int");
	u.addValueTypeObject(obj, "buildname", params.buildname, "string");
	u.optionalAddValueTypeObject(obj, "buildnotes", params.buildnotes, "string");
	u.postToAPI(this.url, obj, callback);
};
