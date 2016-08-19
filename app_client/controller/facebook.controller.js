(function() {

    angular
        .module('fisecApp')
        .controller('facebookController', facebookController);

    //    userController.$inject = ['$scope', 'userService'];
    //
    //    function userController($scope,  userService) {    
    //    function userController($scope,  userService) {    
    userController.$inject = ['$scope', '$uibModal', 'fbService'];

    function facebookController($scope, $uibModal, fbService) {
        console.log("inside userController ...");

        var vm = this;
        vm.pageHeader = {
            title: 'Facebook Test',
            strapline: 'login test'
        };
        vm.message = "";

        vm.fbLogin = function() {
            console.log("facebookController fbLogin ...");
            fbService.login()
                .success(function(data) {
                // get friends and profile data, or even timeline
                    console.log("data %j", data);
//                    vm.users = data.users;
//                    console.log("user list %j", vm.users);
//                    vm.message = "";
                })
                .error(function(e) {
                    console.log(e);
                    vm.message = e;
                });
        }; 

    }; // userController
})(); // function() 