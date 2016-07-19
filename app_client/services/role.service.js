(function() {

    angular
        .module('fisecApp')
        .service('roleService', roleService);

    roleService.$inject = ['$http'];

    function roleService($http) {
        var roles = function(data) {
            console.log("roleService roles ...");
            return $http.post('/api/roles', data);
        };

        var addRole = function(data) {
            console.log("roleService addRole ...");
            console.log("data %j", data);
            return $http.post('/api/addRole', data);
        };

        var userRoles = function(data) {
            console.log("roleService roles ...");
            return $http.post('/api/userRole', data);
        };

        
        return {
            roles: roles,
            addRole: addRole,
            userRoles: userRoles
        };
    } // roleService
})();