(function() {

    angular
        .module('fisecApp')
        .service('authService', authService);

    authService.$inject = ['$http'];

    function authService($http) {
        
        var policyVerOfFirstDomain = function() {
            console.log("authService policyVerOfFirstDomain ...");
            return $http.get('/api/policyVerOfFirstDomain');
        };

        var addPolicy = function(data) {
            console.log("authService addPolicy ...");
            return $http.post('/api/addPolicy', data);
        };
        
        return {
            policyVerOfFirstDomain: policyVerOfFirstDomain,
            addPolicy: addPolicy,
        };
    }

})();