var u = require('./utilities');

/**
 * Retrieves TestPlans Created for Project.
 *
 *	@method	getProjectTestPlans
 * 	@param 	{object}	 testProjectId
 * 	@param  {function} 	 callback
 * 	@return	{Json Object}JSON Object for Project TestPlan(s)
 */
TestLinkApi.prototype.getProjectTestPlans = function(params, callback) {
    var obj = { methodName: "getProjectTestPlans" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "testprojectid", params.testprojectid, "int");
	u.postToAPI(this.url, obj, callback);
};

/**
 * Retrieves Created Test Projects.
 *
 *	@method	getProjects
 * 	@param 	{function} 	 callback
 * 	@return	{Json Object}JSON Object for Project(s)
 */
TestLinkApi.prototype.getProjects = function(callback) {
    var obj = { methodName: "getProjects" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.postToAPI(this.url, obj, callback);
};
