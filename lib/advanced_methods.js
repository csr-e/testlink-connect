/**
 * Creates a test case if it doesn't exist
 * then adds it to a TestPlan
 * then reports
 *
 *	@method	createTestcaseThenReport
 *	@param 	{JSON object} testProjectId, testSuiteId,testPlanId, buildId, testCaseName, summary, version, user, notes, status, callback
 *	@param 	{Function} Success callback with JSON Object for TestPlan
 *	@param 	{Function} Error callback with reason.
 * 	@return	void
 */

TestLinkApi.prototype.createTestCaseThenReport = function(params, successCallback, errCallback) {
    var tc = this;
    params.checkduplicatedname = true;
    params.actiononduplicatedname = 0;
    params.authorlogin = params.user;
    params.executiontype = 2;

    tc.createTestCase(params,function(){
        // createTestCase RESPONSE 1
        tc.getTestCaseIDByName(params,function(tcid){
            // getTestCaseIDByName RESPONSE 2
            params.testcaseid = tcid.struct.id;
            tc.addTestCaseToTestPlan(params,function(response){
                // getTestCaseIDByName RESPONSE 3
                if (typeof params.buildId !== 'undefined'){
                    tc.reportTCResult(params, successCallback, errCallback);
                }else{
                    tc.getLatestBuildForTestPlan(params, function(buildResponse){
                        params.buildid = buildResponse.struct.id;
                        tc.reportTCResult(params, successCallback, errCallback);
                    });
                }
            });
        },
        errCallback);
    },
    errCallback);

};
