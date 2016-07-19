(function() {

    angular
        .module('fisecApp')
        .controller('userRoleController', userRoleController);

    //    userController.$inject = ['$scope', 'userService'];
    //
    //    function userController($scope,  userService) {    
    //    function userController($scope,  userService) {    
    userRoleController.$inject = ['$scope', '$uibModal', 'userService', 'roleService'];

    function userRoleController($scope, $uibModal, userService, roleService) {
        console.log("inside userRoleController ...");

        var vm = this;
        vm.loginToken = userService.loginToken;

        vm.pageHeader = {
            title: 'FiSec',
            strapline: "User's Roles"
        };
        vm.message = "";


        vm.onRefresh = function() {
            console.log("userRoleController onaRefresh ...");

            vm.message = "loading ...";
            roleService.userRoles({
                    userToken: vm.loginToken,
                })
                .success(function(data) {
//                    console.log("data %j", data);
                    vm.role_assignments = data.role_assignments;
                    //                    console.log("consumers list %j", vm.consumers);
                    vm.message = "";
                })
                .error(function(e) {
                    console.log(e);
                    vm.message = e;
                });
        };

    }; // userRoleController
})(); // function()