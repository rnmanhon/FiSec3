(function() {

    angular
        .module('fisecApp')
        .controller('appController', appController);

    //    userController.$inject = ['$scope', 'userService'];
    //
    //    function userController($scope,  userService) {    
    //    function userController($scope,  userService) {    
    appController.$inject = ['$scope', '$uibModal', 'userService', 'appService'];

    function appController($scope, $uibModal, userService, appService) {
        console.log("inside appController ...");

        var vm = this;
        vm.loginToken = userService.loginToken;
        vm.authorizedApp = appService.authorizedApp;
        vm.appAccessToken = appService.appAccessToken;

        vm.pageHeader = {
            title: 'FiSec',
            strapline: 'Consumer / Application'
        };
        vm.message = "";


        vm.onRefresh = function() {
            console.log("appController onaRefresh ...");

            vm.message = "loading ...";
            appService.apps()
                .success(function(data) {
                    console.log("data %j", data);
                    vm.consumers = data.consumers;
                    console.log("consumers list %j", vm.consumers);
                    vm.message = "";
                })
                .error(function(e) {
                    console.log(e);
                    vm.message = e;
                });
        };

        vm.popupNewAppForm = function() {
            console.log("appController popupNewAppForm ...");

            var uibModalInstance = $uibModal.open({
                    templateUrl: '/view/addUserModal.view.html',
                    controller: 'addAppController as vm',
                    resolve: {
                        creator: function() {
                            return {
                                userToken: vm.loginToken,
                            };
                        }
                    }
                }) // $uibModal.open
        }; // popupNewAppForm

    }; // appController
})(); // function()