(function() {

    angular
        .module('fisecApp')
        .service('loginService', loginService);

    loginService.$inject = ['$http'];

    function loginService($http) {
        var login = function(data) {
            console.log("loginService login ...");
            return $http.post('/api/login', data);
        };

        return {
            login: login
        };
    }

})();