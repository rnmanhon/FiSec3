var request = require('request');
var stringify = require('json-stringify-safe');
var _ = require('lodash-getpath');
var polyline = require('polyline');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* POST decode polyline  */
module.exports.decodeRouteGeometory = function(req, res) {
    console.log("decodeRouteGeometory req  %j ", req.body);
    var decodedValue = polyline.decode(req.body.route_geometry);
    console.log("decodedValue  %j ", decodedValue);
    var result = [];

    
    _.forEach(decodedValue, function(value) {
//        result.push(_.zipObject(['lng', 'lat'], _.map(value, function(item) {
//            return item / 10;
        result.push(_.zipObject(['lat', 'lng'], _.map(value, function(item) {
            return item / 10;
        })));
    });    
//    _.forEach(decodedValue, function(value) {
//        result.push(_.zipObject(['lat', 'lng'], _map(value, function(item) {
//            return item / 10;
//        })));
//    });
    console.log("result  %j ", result);

    sendJSONresponse(res, 200, {
        "route": result,
    });

}