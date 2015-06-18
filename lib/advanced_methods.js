/**
 * Creates a test case if it dosen't exist
 * then adds it to a TestPlan
 * then reports
 *
 *	@method	createTestcaseThenReport
 *	@param 	{object}	 testProjectId
 *	@param 	{object}	 testSuiteId
 *	@param 	{object}	 testPlanId
 *	@param 	{object}	 buildId
 *	@param 	{object}	 testCaseName
 *	@param 	{object}	 summary
 *	@param 	{object}	 version
 *	@param 	{object}	 user
 *	@param 	{object}	 notes
 *	@param 	{object}	 status
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestPlan
 */

TestLinkApi.prototype.createTestCaseThenReport = function(params, callback) {
    var tc = this;
    params.checkduplicatedname = true;
    params.actiononduplicatedname = 0;
    params.authorlogin = params.user;
    params.executiontype = 2;

    var createCallback = function(){
        tc.getTestCaseIDByName(params,testCaseNameCallback);
    };

    var testCaseNameCallback = function(callback){
        if( Object.prototype.toString.call( callback ) === '[object Array]' ) {
            console.log( "'createTestCaseThenReport' does not work with duplicate names '" + params.testcasename + "'.");
        }
        params.testcaseid = callback.struct.id;
        tc.addTestCaseToTestPlan(params,testplanCallback);
    };

    var testplanCallback = function(){
        tc.reportTCResult(params,callback);
    };

    tc.createTestCase(params,createCallback);
};
