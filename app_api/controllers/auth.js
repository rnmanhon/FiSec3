//var mongoose = require('mongoose');
//var Loc = mongoose.model('Location');
var request = require('request');
var querystring = require('querystring');
var stringify = require('json-stringify-safe');
var _ = require('lodash-getpath');
//var jwt = require('json-web-token');
var parseString = require('xml2js').parseString;
//var tal = require('template-tal');
var fs = require('fs');

var apiOptions = {
    keystoneServer: "http://localhost:5000",
    horizonServer: "http://localhost:8000",
    authzForceServer: "http://localhost:8084"
};
var domainPath = "/authzforce/domains";
var papRootPath = "/pap/policies/root";
var papPath = "/pap/policies";

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* get first domain and max policy number */
module.exports.policyVerOfFirstDomain = function(req, res) {
    var requestOptions, path;
    console.log('policyVerOfFirstDomain .... ');

    requestOptions = {
        url: apiOptions.authzForceServer + domainPath,
        method: "GET",
        headers: {
            'Accept': 'application/xml',
            'Content-Type': 'application/xml',
        }
    };

    request(
        requestOptions,
        function(err, response, body) {
            var i, data;
            console.log('afte return from authzforce server .... ');
            console.log('getDomain return response are %j', response);
            console.log('getDomain return body are %j', body);

            if ((typeof(response) != "undefined") &&
                (response.statusCode === 200)) {

                parseString(body, function(err, jsonBody) {
                    console.log("body in json %j", jsonBody);
                    var domainID = _.head(getValues(jsonBody, "title"));
                    console.log("doamin ID: ", domainID)
                    doGetDomainPolicy(domainID, res);
                });

            } else {
                console.log('err %j', err);
                console.log('response %j ', response);
                sendJSONresponse(res, 200, {
                    "message": err
                });
            }
        }
    );
}; // policyVerOfFirstDomain


doGetDomainPolicy = function(domainID, res) {
    console.log('doGetDomainPolicy .... ');

    requestOptions = {
        url: apiOptions.authzForceServer + domainPath + "/" + domainID + papRootPath,
        method: "GET",
        headers: {
            'Accept': 'application/xml',
            'Content-Typea': 'application/xml',
        }
    };
    console.log("getPolicies requestOptions  %j ", requestOptions);

    request(
        requestOptions,
        function(err, response, body) {
            var i, data;
            console.log('after return from authzforce server 2 .... ');
            console.log('getPolicies return response are %j', response);
            console.log('getPolicies return body are %j', body);

            if ((typeof(response) != "undefined") &&
                (response.statusCode === 200)) {

                parseString(body, function(err, jsonBody) {
                    console.log("getPolicies body in json %j", jsonBody);
                    var policyVersions = getValues(jsonBody, "href");
                    console.log("policy versions: ", policyVersions);
                    var maxPolicyVersion = getMax(policyVersions);
                    console.log("max policy version: ", maxPolicyVersion);

                    sendJSONresponse(res, 200, {
                        "message": "First domain ID and its current policy number ...",
                        "domain_id": domainID,
                        "policy_ver": maxPolicyVersion,
                    });
                });

            } else {
                console.log('err %j', err);
                console.log('response %j ', response);
                sendJSONresponse(res, 200, {
                    "message": err
                });
            }
        }
    );
}; // doGetDomainPolicy

function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}; // getValues

function getMax(arr) {
    var max;
    for (var i = 0; i < arr.length; i++) {
        if (!max || parseFloat(arr[i]) > parseFloat(max))
            max = arr[i];
    }
    return max;
}; // getMax



/* add policy to default domain and override the old */
module.exports.addPolicy = function(req, res) {
    var requestOptions, path;
    console.log('addPolicy .... ');
    console.log('addPolicy req body %j', req.body);

    // parameter
    // domainID  -- url
    //  version
    //  appId
    //  [subResource,action,role]


    //    fs.readFile('../template/policy.xml', 'utf8', function(err, data) {
    fs.readFile('app_api/template/policy.target.xml', 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            var policyTargetStr = data.replace("{{appId}}", req.body.application_id);
            fs.readFile('app_api/template/policy.rule.xml', 'utf8', function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    var policyRule = data;
                    var policyRuleStr = "";

                    var i = 0;
                    req.body.rules.forEach(function(rule) {
                        ++i;
                        console.log("rule " + i + " --> %j", rule);
                        var policyRuleStrTemp = policyRule.replace("{{subResource}}", rule.subResource);

                        policyRuleStrTemp = policyRuleStrTemp.replace("{{action}}", rule.action);
                        policyRuleStrTemp = policyRuleStrTemp.replace("{{role}}", rule.role);
                        policyRuleStrTemp = policyRuleStrTemp.replace("{{ruleId}}", rule.name);
                        policyRuleStr = policyRuleStr.concat(policyRuleStrTemp);
                    });


                    fs.readFile('app_api/template/policy.xml', 'utf8', function(err, data) {
                        if (err) {
                            return console.log(err);
                        };
                        var policyStr = data.replace("{{policy.target}}", policyTargetStr);
                        policyStr = policyStr.replace("{{policy.rule}}", policyRuleStr);
                        policyStr = policyStr.replace("{{version}}", req.body.policy_ver);
                        console.log("policyStr " + policyStr);

                        doAddPolicy(req.body.domain_id, policyStr, res)
                    }); // readFile policy.xml
                }) // readFile policy.rule.xml
        }) // readFile policy.target.xml
}; // addPolicy

var doAddPolicy = function(domainID, policyStr, res) {
    console.log('doAddPolicy .... ');

    requestOptions = {
        url: apiOptions.authzForceServer + domainPath + "/" + domainID + papPath,
        method: "POST",
        headers: {
            'Accept': 'application/xml',
            'Content-Type': 'application/xml',
        },
        body: policyStr,
    };
    console.log("getPolicies requestOptions  %j ", requestOptions);

    request(
        requestOptions,
        function(err, response, body) {
            var i, data;
            console.log('after return from authzforce server .... ');
            console.log('doAddPolicy return response are %j', response);
            console.log('doAddPolicy return body is' + body);

            if ((typeof(response) != "undefined") &&
                (response.statusCode === 200)) {
                //                var accessToken = _.getPath(JSON.parse(body), "access_token");
                //                console.log('accessToken  is ', accessToken);
                sendJSONresponse(res, 200, {
                    "message": "accessToken  ...",
                    "serverResponse": body,
                    "policyAdded": policyStr,
                });
            } else {
                console.log('err %j', err);
                console.log('response %j ', response);

                var errMsg = _.getPath(response, "body.error.message");
                var errCode = _.getPath(response, "statusCode");
                if (typeof(errMsg) == "undefined") {
                    errMsg = err;
                }
                if (typeof(errMsg) == "undefined") {
                    errMsg = "policy add error";
                }
                if (typeof(errCode) == "undefined") {
                    errCode = 400;
                }
                console.log('errMsg: ' + errMsg);
                console.log('errCode: ' + errCode);

                sendJSONresponse(res, errCode, {
                    "message": errMsg
                }); // sendJSONresponse            

            }
        }
    );
};