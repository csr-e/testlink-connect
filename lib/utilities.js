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
var protocol;
module.exports = {

    postCompose: function(url) {
		var re = /(https?):\/\/([^:|\/]*)(:[0-9]+)?(.*)/ ;
        var tokens = url.match(re);
		var	theWholeUrl = tokens[0];
		protocol = tokens[1];
		var	host = tokens[2];
		var	port = tokens[3];
		var	path = tokens[4];
		if (port === undefined){ port = (protocol === "https" ? "443" : "80"); }

        return {
            host: host,
            path: path,
            port: port,
            method: "POST",
            headers: {
                'Cookie': "cookie",
                'Content-Type': 'text/xml',
            }
        };
    },
    postRequest: function(post, body, callback) {
		var proto = (protocol === "https" ? https : http);
        var req = proto.request(post, function(res) {
            var buffer = "";
            res.on("data", function(data) {
                buffer = buffer + data;
            });
            res.on("end", function(data) {
                callback(buffer);
            });
        });
        req.write(body);
        req.end();
    },

/**
 * Retrieves Json Object from XML Response.
 *
 *	@method getJsObjectByXmlResponse
 * 	@param 	{object}	 response
 * 	@return	{Json Object}JSON Object
 */
    getJsObjectByXmlResponse: function(response) {
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
    },
/**
 * Converts the Response to Object.
 *
 *	@method getRequestByObject
 * 	@param 	{object}	 response
 * 	@return	{Json Object}JSON Object
 */
    getRequestByObject: function(object) {
        var xmlResponse 	= "",
			methodCall 		= "",
			parallelTag 	= "",
			oneLabelArray 	= "";
        for (property in object) {
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
                        '<' + object[property]['type'] + '>' + object[property]['value'] + '</' + object[property]['type'] + '></value></member>\n';
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
    }

};
