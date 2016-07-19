(function() {

    angular
        .module('fisecApp')
        .controller('userController', userController);

    //    userController.$inject = ['$scope', 'userService'];
    //
    //    function userController($scope,  userService) {    
    //    function userController($scope,  userService) {    
    userController.$inject = ['$scope', '$uibModal', 'userService'];

    function userController($scope, $uibModal, userService) {
        console.log("inside userController ...");

        //        // check if lodash work
        //        var array = [1];
        //        var other = _.concat(array, 2, [3], [
        //            [4]
        //        ]);
        //        console.log('lodash working ...' + other);

        var vm = this;
        vm.loginToken = userService.loginToken;
        
        vm.pageHeader = {
            title: 'FiSec',
            strapline: 'Keystone user'
        };
        vm.message = "";


        vm.popupLoginForm = function() {
            console.log("userController userController ...");

            var uibModalInstance = $uibModal.open({
                templateUrl: '/view/loginModal.view.html',
                controller: 'loginController as vm',
            }); // $uibModal.open
            uibModalInstance.result.then(function(data) {
                userService.loginToken = data.token;
                vm.loginToken = userService.loginToken;
                console.log("userController userController return token " + vm.loginToken);
            });
        }; // popupNewUserForm        

        vm.onRefresh = function() {
            console.log("userController onaRefresh ...");

            vm.message = "loading ...";
            userService.users({
                    userToken: vm.loginToken,
                })
                .success(function(data) {
                    console.log("data %j", data);
                    vm.users = data.users;
                    console.log("user list %j", vm.users);
                    vm.message = "";
                })
                .error(function(e) {
                    console.log(e);
                    vm.message = e;
                });
        };

        vm.popupNewUserForm = function() {
            console.log("userController popupNewUserForm ...");

            var uibModalInstance = $uibModal.open({
                    templateUrl: '/view/addUserModal.view.html',
                    controller: 'addUserController as vm',
                    resolve: {
                        creator: function() {
                            return {
                                userToken: vm.loginToken,
                            };
                        }
                    }
                }) // $uibModal.open
        }; // popupNewUserForm

    }; // userController
})(); // function()