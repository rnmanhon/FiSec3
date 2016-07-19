(function() {

    angular
        .module('fisecApp')
        .service('appService', appService);

    appService.$inject = ['$http'];

    function appService($http) {
        var authorizedApp, appAccessToken;

        var apps = function() {
            console.log("appService apps ...");
            return $http.get('/api/consumers');
        };

        var loadAccessToken = function(data) {
            console.log("appService loadAccessToken ...");
            return $http.post('/api/accessToken', data);
        };


        var addApp = function(data) {
            console.log("appService addApp ...");
            console.log("data %j", data);
            return $http.post('/api/addApp', data);
        };

        //        var getRemote = function(data) {
        //            console.log("appService getRemote ...");
        //            console.log("data %j", data);
        //            return $http.get(data.urlPrefix + data.urlSuffix);
        //        };
        //
        //        var postRemote = function(data) {
        //            console.log("appService postRemote ...");
        //            console.log("data %j", data);
        //            return $http.post(data.urlPrefix + data.urlSuffix);
        //        };

        var invokeRemote = function(data) {
            console.log("appService invokeRemote ...");
            console.log("data %j", data);
            requestOption = {
                method: data.action,
                url: data.urlPrefix + data.urlSuffix,
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                    'X-Auth-Token': data.appAccessToken,
                }
            };
            console.log("requestOption %j", requestOption);
            return $http(requestOption);
        };

        return {
            appAccessToken: appAccessToken,
            apps: apps,
            loadAccessToken: loadAccessToken,
            addApp: addApp,
            authorizedApp: authorizedApp,
            //            getRemote: getRemote,
            //            postRemote: postRemote,
            invokeRemote: invokeRemote,
        };
    }

})();