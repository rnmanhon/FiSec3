(function () {

    angular
        .module('fisecApp')
        .service('mapService', mapService);

    mapService.$inject = ['$http'];

    function mapService($http) {

        var config = {};
        config.region = {
            NW: {
                longitude: 114.1544
                , latitude: 22.3221
            }
            , NE: {
                longitude: 114.1604
                , latitude: 22.3221
            }
            , SE: {
                longitude: 114.1604
                , latitude: 22.3168
            }
            , SW: {
                longitude: 114.1544
                , latitude: 22.3168
            }
        };

        var getRandomPointInRegion = function () {
            var randomPoint = {
                longitude: 0
                , latitude: 0
            };
            while (!geolib.isPointInside(randomPoint, [config.region.NW, config.region.NE, config.region.SE, config.region.SW])) {
                randomPoint = {
                    longitude: (Math.random() * (config.region.NW.longitude - config.region.SE.longitude) + config.region.SE.longitude).toFixed(4)
                    , latitude: (Math.random() * (config.region.NW.latitude - config.region.SE.latitude) + config.region.SE.latitude).toFixed(4)
                }
            };
            return randomPoint;
        };

        var findRoute = function (data) {
            console.log("mapService findRoute ...");
            url = "http://router.project-osrm.org/viaroute" +
                "?loc=" + data.startPos.lat + "," + data.startPos.lng +
                "&loc=" + data.endPos.lat + "," + data.endPos.lng +
                "&instructions=true";
            return $http.get(url);

            // http://router.project-osrm.org/viaroute?
            // loc = 52.503033, 13.420526 & loc = 52.516582, 13.429290 & instructions = true
        };

        var decodeRouteGeometory = function (data) {
            console.log("mapService decodeRouteGeometory ...");
            console.log("data %j", data);
            return $http.post('/api/decodeRouteGeometory', data);
        }

        return {
            findRoute: findRoute
            , decodeRouteGeometory: decodeRouteGeometory
            , getRandomPointInRegion: getRandomPointInRegion


            
        , };
    }

})();