var http 				= 	require('http'),
	https 				= 	require('https'),
	xpath 				= 	require('xpath'),
	SimpleConvertXML 	= 	require('simpleconvert-xml'),
	dom 				= 	require('xmldom').DOMParser;

/**
* To Convert the XMl Response to Json Object
*
* @class Utilities
*/
var Utilities = {
    version: "0.9"
};
module.exports = Utilities;

/**
 * try invoke callback if not null or undefined.
 * second and next arguments will be passed as first and next arguments to callback
 */
function tryCallback(callback, ...args) {
    if (!callback) {
        // no object reference
        return;
    }
    if (typeof callback == "function") {
        callback.apply({}, args);
    } else {
        // Internal error. wrong parameter
        console.error("Can not call to not function : " + callback)
    }
}

function log(...args) {
    if (Utilities.isVerboseEnabled ) {
        console.info.apply(this, args);
    }
}

Utilities.isVerboseEnabled = !!(process.env.VERBOSE);

console.info("Testlink-connect.Utilities. Verbose: " + Utilities.isLogEnabled );

/**

 *  Async POST converting JSON object to XML. The result will be
 *  JSON object from XML response is sucessfull.
 *	@method postToAPI
 * 	@param 	{String} Full url (protocol, host, port, path)
 * 	@param 	{Json Object} Json object. Data to be sent
 * 	@param 	{Function} callback for data response as xml
 * 	@return	{Function} optional callback for error. 
 */
Utilities.postToAPI = function(url, object, callback, errCallback){
    // compose message
    var postConfig, body;
    try {
        postConfig = Utilities.postCompose(url);
        body = Utilities.getRequestByObject(object);
    } catch (err) {
        var sErr = "Error composing TL_POST ";
        console.error(sErr, err);
        tryCallback(errCallback, new Error(sErr, err));
    }
    
    log("TL_Util. POST: ", postConfig, "\n Body:\n", body)
  
	Utilities.postRequest(postConfig, body, 
        function(xmlResp) { // ok response
            var jsObject;
            try {
                jsObject = Utilities.getJsObjectByXmlResponse(xmlResp);
            } catch (err) {
                tryCallback(errCallback, new Error("Error parsing TL response: " + xmlResp , err));
            }
            tryCallback(callback, jsObject);
        }, 
        errCallback // err response
    );
};

/**
  * Compose an object for POST configuration.
 *	@method postCompose
 * 	@param 	{String} url (protocol, host, port, path)
 * 	@return	{Json Object} JSON Object as configuration for httpClient
 */
Utilities.postCompose = function(url) {
    var re = /(https?):\/\/([^:|\/]*)(:[0-9]+)?(.*)/ ;
    var tokens = url.match(re);
    var	theWholeUrl = tokens[0];
    var protocol = tokens[1];
    var	host = tokens[2];
    var	port = tokens[3];
    var	path = tokens[4];
    if (port === undefined){ port = (protocol === "https" ? "443" : "80"); }
    port = port.replace(":","");

    return {
        protocol: protocol + ":",
        host: host,
        path: path,
        port: port,
        method: "POST",
        headers: {
            'Cookie': "cookie",
            'Content-Type': 'text/xml',
        }
    };
};

/**
  * Do an async post query using xml data.
 *	@method postRequest
 * 	@param 	{Json Object} Json object. (protocol, host, port, path)
 * 	@param 	{String} xml content
 * 	@param 	{Function} callback for data response as xml
 * 	@return	{Function} optional callback for error. 
 */
Utilities.postRequest = function(post, body, callback, errCallback) {
    var httpClient = (post.protocol === "https:" ? https : http);
    var buffer = "";
    var req = httpClient.request(post, function(res) {
        res.on("data", function(data) {
            buffer = buffer + data;
        });
        res.on("end", function() {
            callback(buffer);
        });
    }).on("error", function(e){
        if( (buffer.indexOf("DB Access Error") <= -1)){
            // sirve esto apara algo?
           // console.log("Got error: " + e.message);
        }
        var sPost = JSON.stringify(post);
        console.error("Error Utilities.postRequest: " + sPost + "\nBuffer: " + buffer, e);
        tryCallback(errCallback, new Error("Error Utilities.postRequest: " + sPost, e));
    });
    req.write(body);
    req.end();
};

/**
 * Retrieves Json Object from XML Response.
 *
 *	@method getJsObjectByXmlResponse
 * 	@param 	{object}	 response
 * 	@return	{Json Object}JSON Object
 */
 Utilities.getJsObjectByXmlResponse = function(response) {
    if(response.indexOf("DB Access Error") > -1) {
        return { struct: { error: 'DB Access Error' } };
    }
    var parser = new dom().parseFromString(response);
    if (xpath.select("//data", parser).length > 0)
        response = xpath.select("//data", parser)[0].toString();
    parser = new dom().parseFromString(response);
    if (xpath.select("//param", parser).length > 0)
        response = xpath.select("//param", parser)[0].toString();
    var changeAttrToTag = /<member><name>(.*)<\/name><value><(string|int)>((.|[\r\n])*?)<\/\2><\/value><\/member>/;
    var nullyfy = /<member><name>.*?<string\/>.*?<\/member>/;
    if (nullyfy.test(response))
        response = response.replace(/<member><name>.*?<string\/>.*?<\/member>/g, '');
    var flag = changeAttrToTag.test(response);
    var changedTagResponse = "";
    if (flag) {
        response = response.replace(/<member><name>(.*)<\/name><value><(string|int)>((.|[\r\n])*?)<\/\2><\/value><\/member>/g, "<$1>$3</$1>");
        var recusiveRegx = /<member><name>(.*)?<\/name><value><struct>(((.|[\r\n])(?!<struct>))*?)<\/struct><\/value><\/member>/;
        var recursiveFlag = recusiveRegx.test(response);
        while (recursiveFlag) {
            response = response.replace(/<member><name>(.*)?<\/name><value><struct>(((.|[\r\n])(?!<struct>))*?)<\/struct><\/value><\/member>/, "<_$1>$2</_$1>");
            recursiveFlag = recusiveRegx.test(response);
        }
        response = response.replace(/<member><name>(.*)?<\/name><value><struct>(((.|[\r\n])(?!<struct>))*?)<\/struct><\/value><\/member>/, "<$1>$2</$1>");
    }

    var xmlNode = new dom().parseFromString(response),
        json = SimpleConvertXML.getXMLAsObj(xmlNode);
    var returnObject;
    if (json.data) {
        returnObject = json.data.value;
    }
    else {
        if (json.param) {
            returnObject = json.param.value;
        }
    }
    return returnObject;
};

/**
 * Converts the Response to Object.
 *
 *	@method getRequestByObject
 * 	@param 	{object}	 response
 * 	@return	{Json Object}JSON Object
 */
Utilities.getRequestByObject = function(object) {
    var xmlResponse 	= "",
        methodCall 		= "",
        parallelTag 	= "",
        oneLabelArray 	= "";
    for (var property in object) {
        if (property === "methodName") {
            methodCall = '<methodName>tl.' + object[property] + '</methodName>\n';
        }
        else
        {
            if (Array.isArray(object[property])) {
                var recursiveTags = "";
                object[property].map(function(tag) {
                    recursiveTags = recursiveTags + '<member><name>' + tag.type + '</name><value><' + tag.name + '>' + tag.value + '</' + tag.type + '></value></member>\n';
                });

                oneLabelArray = oneLabelArray + '<member><name>' + property + '</name><value><struct>\n' + recursiveTags + '</struct></value></member>';
            }
            else {
                parallelTag = parallelTag + '<member><name>' + property + '</name><value>' +
                    '<' + object[property].type + '>' + object[property].value + '</' + object[property].type + '></value></member>\n';
            }
        }

    } //End of loop

    xmlResponse = '<?xml version="1.0"?>\n' +
        '<methodCall>\n' +
        methodCall +
        '<params>' +
        '<param><value><struct>\n' +
        parallelTag +
        oneLabelArray +
        '</struct></value></param>\n' +
        '</params></methodCall>';
    return xmlResponse;
};

Utilities.addValueTypeObject = function(object, key, valueVariable, objectType){
	object[key] = { value: valueVariable || key, type : objectType};
};

Utilities.addValueTypeObjectChoices = function(object, mainKey, mainValueVariable, backupKey, backupValueVariable, objectType){
	if(mainValueVariable !== undefined){
		Utilities.addValueTypeObject(object, mainKey, mainValueVariable, objectType);
	}else{
		Utilities.addValueTypeObject(object, backupKey, backupValueVariable, objectType);
	}
};

Utilities.optionalAddValueTypeObject = function(object, key, valueVariable, objectType){
	if(valueVariable !== undefined){
		Utilities.addValueTypeObject(object, key, valueVariable, objectType);
	}
};
