(function () {

    angular
        .module('fisecApp')
        .controller('mapController', mapController);

    mapController.$inject = ['$scope', '$uibModal', '$interval', 'mapService'];
    //    mapController.$inject = ['$scope', '$uibModal', 'mapService'];

    function mapController($scope, $uibModal, $interval, mapService) {
        //    function mapController($scope, $uibModal, mapService) {
        console.log("inside mapController ...");
        
        
        $interval(callAtInterval, 5000);
        var point1, point2;
        function callAtInterval() {
            if (typeof (point1) == "undefined")
                 point1 = mapService.getRandomPointInRegion();
            if (typeof (point2) == "undefined")
                 point2 = mapService.getRandomPointInRegion();
            console.log("point 1 %j ", point1);
            console.log("point 2 %j ", point2);
        }

        var vm = this;
        vm.myLocation = {
            lng: 114.156296
            , lat: 22.319480
            , zoom: 14
        , };
        vm.events = {};
        vm.markers = new Array();
        vm.paths = {};
        vm.tiles = {
            //            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url: "http://u.ray/osm_tiles/{z}/{x}/{y}.png"
        }

        $scope.$on("leafletDirectiveMap.click", function (event, args) {
            console.log("in leafletDirectiveMap.click");
            var leafEvent = args.leafletEvent;

            //            if (typeof Obj.property == "undefined") {
            //                // Assign value to the property here
            //                Obj.property = someValue;
            //            }
            if (typeof (vm.startPos) == "undefined") {
                vm.startPos = {
                    lat: leafEvent.latlng.lat
                    , lng: leafEvent.latlng.lng
                , };
                vm.markers.push({
                    lat: leafEvent.latlng.lat
                    , lng: leafEvent.latlng.lng
                    , message: "My Route start at lat: " + leafEvent.latlng.lat + " long: " + leafEvent.latlng.lng
                });
            } else if (typeof (vm.endPos) == "undefined") {
                vm.endPos = {
                    lat: leafEvent.latlng.lat
                    , lng: leafEvent.latlng.lng
                , };
                vm.markers.push({
                    lat: leafEvent.latlng.lat
                    , lng: leafEvent.latlng.lng
                    , message: "My Route end at lat: " + leafEvent.latlng.lat + " long: " + leafEvent.latlng.lng
                });
                mapService.findRoute({
                        startPos: vm.startPos
                        , endPos: vm.endPos
                    })
                    .success(function (data) {
                        console.log("data %j", data);
                        mapService.decodeRouteGeometory({
                                route_geometry: data.route_geometry
                            , })
                            .success(function (data2) {
                                console.log("data2 %j", data2);

                                vm.paths = {
                                    p1: {
                                        color: 'blue'
                                        , weight: 4
                                        , latlngs: data2.route
                                        , message: "nearest path!"
                                    , }
                                , };
                                console.log("$scope paths %j", $scope.paths);
                                //                                $scope.$apply();
                            }); // success decodeRouteGeometory
                    }) // success findRoute
                    .error(function (e) {
                        console.log(e);
                        //                        vm.message = e;
                    }); // mapService findRoute                    

            } else {
                delete vm.startPos;
                delete vm.endPos;
                vm.markers = new Array();
                vm.paths = {};

                vm.startPos = {
                    lat: leafEvent.latlng.lat
                    , lng: leafEvent.latlng.lng
                , };
                vm.markers.push({
                    lat: leafEvent.latlng.lat
                    , lng: leafEvent.latlng.lng
                    , message: "My Route start at lat: " + leafEvent.latlng.lat + " long: " + leafEvent.latlng.lng
                });


            } // if vm.startPos and vm.endPos

        }); // leafletDirectiveMap.click




    }; // mapController

})(); // function()