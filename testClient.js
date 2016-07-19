var request = require('request');


var apiOptions = {
    myServer: "http://192.168.211.128:3000"
};

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};


function invokeServer(msg) {
    var requestOptions, path;
    path = "/test";
    console.log('invoke my server  .... ' + msg);

    requestOptions = {
        url: apiOptions.myServer + path
        , method: "GET"
        , headers: {
            //            'Accept': 'application/json',
            //            'Content-Typea': 'application/json',
        }
        , qs: {
            msg: msg
            , time: +new Date()
        }
    };

    request(
        requestOptions
        , function (err, response, body) {
            var i, data;
            console.log('after return from my Server.... ');

            if ((typeof (response) != "undefined") &&
                (response.statusCode === 200)) {
                console.log('data returned is %j', body);
            } else {
                console.log('err %j', err);
                console.log('response %j ', response);
            }
        }
    );

};


//var i = 1;
for (var i = 0; i < 100; i++) {
    
    invokeServer('server' + i);
}