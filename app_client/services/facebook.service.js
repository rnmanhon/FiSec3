(function() {

    angular
        .module('fisecApp')
        .service('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var loginToken;
        var users = function(data) {
            console.log("userService users ...");
            return $http.post('/api/users',data);
        };

        var addUser = function(data) {
            console.log("userService addUser ...");
            console.log("data %j", data);
            return $http.post('/api/addUser', data);
        };

        return {
            users: users,
            addUser: addUser,
            loginToken: loginToken
        };
    }

})();