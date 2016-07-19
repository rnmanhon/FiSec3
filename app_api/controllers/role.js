//var mongoose = require('mongoose');
//var Loc = mongoose.model('Location');
var request = require('request');
var stringify = require('json-stringify-safe');
var _ = require('lodash-getpath');
var jwt = require('json-web-token');

var apiOptions = {
    keystoneServer: "http://localhost:5000"
};


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


/* GET list of roles */
module.exports.listRole = function(req, res) {
    var requestOptions, path;
    path = "/v3/OS-ROLES/roles";
    console.log('listRole .... ');
    console.log('listRole req body %j', req.body);

    requestOptions = {
        url: apiOptions.keystoneServer + path,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Typea': 'application/json',
            //            'X-Auth-Token': _.getPath(req, "body.userToken"),        
            //            'X-Auth-Token': req.body.userToken,
            'X-Auth-Token': 'ADMIN',
        },
        json: {}
    };

    request(
        requestOptions,
        function(err, response, body) {
            var i, data;
            console.log('after return from keystone server .... ');

            if ((typeof(response) != "undefined") &&
                (response.statusCode === 200)) {
                data = body.roles;
                console.log('roles are %j', data);
                sendJSONresponse(res, 200, {
                    "message": "list of roles ...",
                    "roles": data
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

}; // listRole





/* POST add role */
module.exports.addRole = function(req, res) {
    var requestOptions, path;
    path = "/v3/OS-ROLES/roles";
    console.log('addRole .... ');
    console.log('addRole req body %j', req.body);

    requestOptions = {
        url: apiOptions.keystoneServer + path,
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Typea': 'application/json',
            'X-Auth-Token': req.body.userToken,
            //            'X-Auth-Token': _.getPath(req, "body.userToken"),
            //            'X-Auth-Token': 'ADMIN',
        },
        json: {
            "role": {
                "name": req.body.name,
                "application_id": req.body.application_id
            }
        }
    };

    request(
        requestOptions,
        function(err, response, body) {
            var i, data;
            console.log('after return from keystone server .... ');

            if ((typeof(response) != "undefined") &&
                (response.statusCode === 201)) {
                console.log('return response are %j', response);
                console.log('return body are %j', body);
                sendJSONresponse(res, 200, body);

                //                data = body.roles;
                //                console.log('roles are %j', data);
                //                sendJSONresponse(res, 200, {
                //                    "message": "list of roles ...",
                //                    "roles": data
                //                });
            } else {
                console.log('err %j', err);
                console.log('response %j ', response);
                sendJSONresponse(res, 400, {
                    "message": err
                });
            }
        }
    );

}; // addRole


/* POST add role */
module.exports.userRole = function(req, res) {
    var requestOptions, path;
    path = "/v3/OS-ROLES/users/role_assignments";
    console.log('userRole .... ');
    console.log('userRole req body %j', req.body);

    requestOptions = {
        url: apiOptions.keystoneServer + path,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Typea': 'application/json',
            //            'X-Auth-Token': req.body.userToken,
            'X-Auth-Token': 'ADMIN',
        },
        json: {}
    };

    request(
        requestOptions,
        function(err, response, body) {
            var i, data;
            console.log('after return from keystone server .... ');

            if ((typeof(response) != "undefined") &&
                (response.statusCode === 200)) {
                console.log('return response are %j', response);
                console.log('return body are %j', body);

                // *****************
                // return user as array
                // ******************
                var raGroupByUser = groupBy(body.role_assignments, "user_id", "user_id", "applications");
                console.log('body.roleassignment group by user are %j', raGroupByUser);

                raGroupByUser.forEach(function(userrole) {
                    console.log("itme x --> %j", userrole);
                    var raGroupByUser2 = groupBy(userrole.applications, "application_id", "application_id", "roles");
                    userrole.applications = raGroupByUser2
                });

                console.log('body.roleassignment group by user and app id are %j', raGroupByUser);



                // *****************
                // return user as json properties
                // ******************
                //                var raGroupByUser = _.groupBy(body.role_assignments, "user_id");
                //                console.log('body.roleassignment group by user are %j', raGroupByUser);
                //                
                //                for (var user in raGroupByUser) {
                //                    console.log('user processing is ' + user);
                //                    if (raGroupByUser.hasOwnProperty(user)) {
                //                        var val = raGroupByUser[user];
                //                        raGroupByUser[user] = _.groupBy(val, "application_id");
                //                    }
                //                }
                //                console.log('body.roleassignment group by user and app id are %j', raGroupByUser);                
                // *****************
                // end: return user and json properties
                // ******************


                // *****************
                // Testing
                // ******************

                //                console.log('myGroupBy %j', myGroupBy(body.role_assignments));
                //
                //                var testObj = [{
                //                    "organization_id": "idm_project",
                //                    "application_id": "idm_admin_app",
                //                    "user_id": "idm_user",
                //                    "role_id": "provider"
                //                }, {
                //                    "organization_id": "idm_project",
                //                    "application_id": "aa463756ea8546cba000b5aaeeb13b88",
                //                    "user_id": "idm_user",
                //                    "role_id": "provider"
                //                }, {
                //                    "organization_id": "idm_project",
                //                    "application_id": "589ad81257af4de190622a56ef52726e",
                //                    "user_id": "idm_user",
                //                    "role_id": "provider"
                //                }, {
                //                    "organization_id": "idm_project",
                //                    "application_id": "589ad81257af4de190622a56ef52726e",
                //                    "user_id": "idm_user2",
                //                    "role_id": "provider"
                //                }, {
                //                    "organization_id": "idm_project",
                //                    "application_id": "589ad81257af4de190622a56ef52726e",
                //                    "user_id": "idm_user",
                //                    "role_id": "test"
                //                }];

                // ***
                // test 1
                // *****
                //                var testObjG = _.groupBy(testObj, "user_id");
                //                console.log('testObj groupBy %j', testObjG);
                //                for (var key in testObjG) {
                //                    console.log('key is ' + key);
                //                    if (testObjG.hasOwnProperty(key)) {
                //                        var val = testObjG[key];
                //                        testObjG[key] = _.groupBy(val, "application_id");
                //                    }
                //                }
                //                console.log('testObj 2 groupBy %j', testObjG);
                // ***
                // end: test 1
                // *****

                // ***
                // test 2
                // *****
                //                var testObjG = groupBy(testObj, "user_id", "user_id", "applications");
                //                console.log('testObj group by user are %j', testObjG);
                //
                //                testObjG.forEach(function(userrole) {
                //                    console.log("itme x --> %j", userrole);
                //                    var testObjG2 = groupBy(userrole.applications, "application_id", "application_id", "roles");
                //                    userrole.applications = testObjG2
                //                });
                //                console.log('testObj group by user and app id are %j', testObjG);
                // ***
                // end: test 2
                // *****

                // *****************
                // End: Testing
                // ******************



                sendJSONresponse(res, 200, {
                    "message": "list of user's roles ...",
                    role_assignments: raGroupByUser,
                    //                    role_assignments: testObjG,
                });

                //                data = body.roles;
                //                console.log('roles are %j', data);
                //                sendJSONresponse(res, 200, {
                //                    "message": "list of roles ...",
                //                    "roles": data
                //                });
            } else {
                console.log('err %j', err);
                console.log('response %j ', response);
                sendJSONresponse(res, 400, {
                    "message": err
                });
            }
        }
    );

}; // addRole

function myGroupBy(data) {
    var result = _.chain(data)
        .groupBy("user_id")
        //        .toPairs()
        //                .map(function(currentItem) {
        //                    return _.groupBy(currentItem, "application_id");
        //                })  // map
        .value();
    return result;
} // myGroupBy

function groupBy(dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren) {
    var result = _.chain(dataToGroupOn)
        .groupBy(fieldNameToGroupOn)
        .toPairs()
        .map(function(currentItem) {
            return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
        })
        .value();
    return result;
} // groupBy