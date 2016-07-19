var express = require('express');
var app = express();
var Bunyan = require('bunyan');
var logger = Bunyan.createLogger({
    name: 'testServer'
    , streams: [{
        level: Bunyan.DEBUG
        , path: './log.log'
    }]
});
//var logger = require('morgan');
//// create a write stream (in append mode) 
//var accessLogStream = fs.createWriteStream(__dirname + '/log.log', {flags: 'a'})

//// setup the logger 
//app.use(morgan('combined', {stream: accessLogStream}))

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

function loopIt(res) {
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            logger.info('request: ' + msg + ' i: ' + i + ' j: ' + j);
        }
    }
    sendJSONresponse(res, 200, {
        "message": 'you said: ' + msg
    });

}

// fake fiwareApp and siteWhereApp
app.get('/test', function (req, res) {
    //    console.log("get request ->", req);
    //    console.log("get request body ->", req.body);
    console.log("get querryr string msg ->", req.query.msg);
    msg = req.query.msg
    loopIt(res);

    //    var i = 1;
    //    var j = 1;

});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});


