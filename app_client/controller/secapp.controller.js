(function() {

    angular
        .module('fisecApp')
        .controller('secappController', secappController);

    //    userController.$inject = ['$scope', 'userService'];
    //
    //    function userController($scope,  userService) {    
    //    function userController($scope,  userService) {    
    secappController.$inject = ['$scope', '$location', '$rootScope', '$uibModal', 'appService'];

    function secappController($scope, $location, $rootScope, $uibModal, appService) {
        console.log("inside secappController ...");

        var vm = this;
        //        vm.protocol = $location.protocol();
        //        vm.host = $location.host();
        //        vm.defaultUrlPrefix = $location.protocol() + "://" + $location.host() + ":3000/";
        vm.defaultUrlPrefix = $location.protocol() + "://" + $location.host() + ":81/";
        //        vm.remoteApps = [];
        //        vm.remoteApps.push({});



        vm.pageHeader = {
            title: 'FiSec',
            strapline: 'SecApp'
        };
        vm.message = "";
        vm.appAccessToken = appService.appAccessToken;
        vm.authorizedApp = appService.authorizedApp;

        // init the appication token
        var init = function() {
            var queryParameter = $location.search()
            console.log("queryParameter %j ", queryParameter);
            console.log("queryParameter length  " + Object.keys(queryParameter).length);

            // skip initization for user switch tab
            if (Object.keys(queryParameter).length != 0) {
                vm.message = "loading access token ...";

                appService.loadAccessToken(queryParameter)
                    .success(function(data) {
                        console.log("data %j", data);
                        appService.appAccessToken = data.accessToken;
                        vm.appAccessToken = appService.appAccessToken;
                        $rootScope.appAccessToken = appService.appAccessToken;
                        appService.authorizedApp = data.authorizedApp;
                        vm.authorizedApp = appService.authorizedApp;
                        vm.message = "";
                    })
                    .error(function(e) {
                        console.log(e);
                        vm.message = e;
                    });
            }

        }
        init();

        vm.getRemote = function() {
            console.log("secappController getRemote ...");

            appService.invokeRemote({
                    action: 'GET',
                    appAccessToken: vm.appAccessToken,
                    urlPrefix: vm.remoteApp.urlPrefix,
                    urlSuffix: vm.remoteApp.urlSuffix,
                })
                .success(function(data) {
                    console.log("data %j", data);
                    vm.message = data;
                })
                .error(function(e) {
                    console.log(e);
                    vm.message = e;
                });

            //            appService.getRemote({
            //                    appAccessToken: vm.appAccessToken,
            //                    urlPrefix: vm.remoteApp.urlPrefix,
            //                    urlSuffix: vm.remoteApp.urlSuffix,
            //                })
            //                .success(function(data) {
            //                    console.log("data %j", data);
            //                    vm.message = data;
            //                })
            //                .error(function(e) {
            //                    console.log(e);
            //                    vm.message = e;
            //                });

        }; // getRemote

        vm.postRemote = function() {
            console.log("secappController postRemote ...");
            appService.invokeRemote({
                    action: 'POST',
                    appAccessToken: vm.appAccessToken,
                    urlPrefix: vm.remoteApp.urlPrefix,
                    urlSuffix: vm.remoteApp.urlSuffix,
                })
                .success(function(data) {
                    console.log("data %j", data);
                    vm.message = data;
                })
                .error(function(e) {
                    console.log(e);
                    vm.message = e;
                });

            //            appService.postRemote({
            //                    appAccessToken: vm.appAccessToken,
            //                    urlPrefix: vm.remoteApp.urlPrefix,
            //                    urlSuffix: vm.remoteApp.urlSuffix,
            //                })
            //                .success(function(data) {
            //                    console.log("data %j", data);
            //                    vm.message = data;
            //                })
            //                .error(function(e) {
            //                    console.log(e);
            //                    vm.message = e;
            //                });

        }; // getRemote        

    }; // secappController
})(); // function()