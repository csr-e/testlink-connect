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

    tc.createTestCase(params,function(){
        tc.getTestCaseIDByName(params,function(tcid){
            params.testcaseid = tcid.struct.id;
            tc.addTestCaseToTestPlan(params,function(response){
                if (typeof params.buildId !== 'undefined'){
                    tc.reportTCResult(params,callback);
                }else{
                    tc.getLatestBuildForTestPlan(params, function(buildResponse){
                        params.buildid = buildResponse.struct.id;
                        tc.reportTCResult(params,callback);
                    });
                }
            });
        });
    });


};
