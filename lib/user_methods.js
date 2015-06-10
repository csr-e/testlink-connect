var u = require('./utilities');

/**
 * Retrieves User and user properties
 *
 *	@method	doesUserExist
 *	@param 	{object}	 user
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for User
 */
TestLinkApi.prototype.doesUserExist = function(params, callback) {
	var	obj = { methodName: "doesUserExist" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
	u.addValueTypeObject(obj, "user", params.user, "string");
	u.postToAPI(this.url, obj, callback);
};

/**
 * Retrieves User and user properties
 *
 *	@method	getUserByID
 *	@param 	{object}	 userId
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for User
 */
TestLinkApi.prototype.getUserByID = function(params, callback) {
	var	obj = { methodName: "getUserByID" };
    u.addValueTypeObject(obj, "devKey", this.devkey, "string");
    u.addValueTypeObject(obj, "userid", params.userid, "string");
    u.postToAPI(this.url, obj, callback);
};

/**
 * Retrieves LoggedIn User and properties
 *
 *	@method getUserByLogin
 *	@param 	{object}	 user
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for User
 */
TestLinkApi.prototype.getUserByLogin = function(params, callback) {
	var	obj = { methodName: "getUserByLogin" };
	u.addValueTypeObject(obj, "devKey", this.devkey, "string");
    u.addValueTypeObject(obj, "user", params.user, "string");
    u.postToAPI(this.url, obj, callback);
};
