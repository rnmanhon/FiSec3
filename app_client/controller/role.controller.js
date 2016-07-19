(function() {

    angular
        .module('fisecApp')
        .controller('roleController', roleController);

    //    userController.$inject = ['$scope', 'userService'];
    //
    //    function userController($scope,  userService) {    
    //    function userController($scope,  userService) {    
    roleController.$inject = ['$scope', '$uibModal', 'userService', 'roleService'];

    function roleController($scope, $uibModal, userService, roleService) {
        console.log("inside roleController ...");

        var vm = this;
        vm.loginToken = userService.loginToken;

        vm.pageHeader = {
            title: 'FiSec',
            strapline: 'Roles'
        };
        vm.message = "";


        vm.onRefresh = function() {
            console.log("roleController onaRefresh ...");

            vm.message = "loading ...";
            roleService.roles({
                    userToken: vm.loginToken,
                })
                .success(function(data) {
                    console.log("data %j", data);
                    vm.roles = data.roles;
                    //                    console.log("consumers list %j", vm.consumers);
                    vm.message = "";
                })
                .error(function(e) {
                    console.log(e);
                    vm.message = e;
                });
        };

        vm.popupNewRoleForm = function() {
            console.log("roleController popupNewRoleForm ...");

            var uibModalInstance = $uibModal.open({
                    templateUrl: '/view/addRoleModal.view.html',
                    controller: 'addRoleController as vm',
                    resolve: {
                        creator: function() {
                            return {
                                userToken: vm.loginToken,
                            };
                        }
                    }
                }) // $uibModal.open
        }; // popupNewRoleForm

    }; // roleController
})(); // function()