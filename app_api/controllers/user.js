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


/* GET list of users */
module.exports.listUser = function(req, res) {
    var requestOptions, path;
    path = "/v3/users";
    console.log('listUser .... ');
    console.log('listUser req body %j', req.body);
    

    requestOptions = {
        url: apiOptions.keystoneServer + path,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Typea': 'application/json',
            'X-Auth-Token': req.body.userToken,
//            'X-Auth-Token': 'ADMIN',
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
                data = body.users;
                console.log('users are %j', data);
                sendJSONresponse(res, 200, {
                    "message": "list of users ...",
                    "users": data
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

};


/* POST user login  */
module.exports.login = function(req, res) {
        var requestOptions, path;
        path = "/v3/auth/tokens";
        console.log('login .... ');
        //    console.log("login req  " +  stringify(req, null, 2));
        console.log("login req  %j ", req.body);

        requestOptions = {
            url: apiOptions.keystoneServer + path,
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Typea': 'application/json',
                'X-Auth-Token': 'ADMIN'
            },
            json: {
                "auth": {
                    "identity": {
                        "methods": ["password"],
                        "password": {
                            "user": {
                                "name": req.body.name,
                                "domain": {
                                    "id": req.body.domainId
                                },
                                "password": req.body.password
                            }
                        }
                    }
                }
            }
        }; // requestOptions
        console.log("requestOptions  %j ", requestOptions);

        request(
            requestOptions,
            function(err, response, body) {
                var i, data;
                console.log('after return from token request .... ');

                if ((typeof(response) != "undefined") &&
                    (response.statusCode === 201)) {
                    console.log('tken return response are %j', response);
                    console.log('tken return body are %j', body);

                    //                data = body.users;
                    console.log('sending token', _.getPath(response, "headers.x-subject-token"));
                    sendJSONresponse(res, 200, {
                        "token": _.getPath(response, "headers.x-subject-token"),
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
                        errMsg = "login error";
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
            } //  function(err, response, body)
        ); // request    
    } // login



/* POST add user  */
module.exports.addUser = function(req, res) {
    var requestOptions, path;
    path = "/v3/users";
    console.log('addUser .... ');
    //    console.log("addUser req  " + stringify(req, null, 2));
    console.log('addUser req body %j', req.body);

    requestOptions = {
        url: apiOptions.keystoneServer + path,
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Typea': 'application/json',
            'X-Auth-Token': req.body.userToken,
        },
        json: {
            "user": {
                "default_project_id": req.body.defaultProjectId,
                "description": req.body.description,
                "domain_id": req.body.domainId,
                "email": req.body.email,
                "enabled": req.body.enabled,
                "name": req.body.name,
                "password": req.body.password
            }
        }
    }; // requestOptions
    console.log("requestOptions  %j ", requestOptions);

    request(
        requestOptions,
        function(err, response, body) {
            var i, data;
            console.log('after create user request .... ');

            if ((typeof(response) != "undefined") &&
                (response.statusCode === 201)) {
                console.log('return response are %j', response);
                console.log('return body are %j', body);
                sendJSONresponse(res, 200, body); 

            } else {
                console.log('err %j', err);
                console.log('response %j ', response);
                sendJSONresponse(res, 400, {
                    "message": err
                }); // sendJSONresponse
            }
        } //  function(err, response, body)
    ); // request
}; // addUser


module.exports.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
}; // generateJwt