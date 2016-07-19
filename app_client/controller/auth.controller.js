(function() {

    angular
        .module('fisecApp')
        .controller('authController', authController);

    //    userController.$inject = ['$scope', 'userService'];
    //
    //    function userController($scope,  userService) {    
    //    function userController($scope,  userService) {    
    authController.$inject = ['$scope', '$window', '$uibModal', '$location', 'userService', 'appService', 'roleService', 'authService'];

    function authController($scope, $window, $uibModal, $location, userService, appService, roleService, authService) {
        console.log("inside authController ...");

        var vm = this;
        vm.loginToken = userService.loginToken;

        vm.pageHeader = {
            title: 'FiSec',
            strapline: 'Authorization policy setting'
        };
        vm.message = "";

        // init the appication token
        var init = function() {
                console.log("authController init ...");
                vm.message = "loading authzforce domain policy info  ...";
                vm.rules = [];

                authService.policyVerOfFirstDomain()
                    .success(function(data) {
                        console.log("data %j", data);
                        vm.domain_id = data.domain_id;
                        vm.policy_ver = (parseFloat(data.policy_ver) + 0.01).toFixed(2);
                        vm.downloadPolicyUrl = 'http://' + $location.host() + ':8084/authzforce/domains/' + vm.domain_id + '/pap/policies/root/' + data.policy_ver;
                        doLoadApps();
                        //                    console.log("data %j", data);
                        //                    vm.domainID = data.domainID;
                        //                    console.log("consumers list %j", vm.consumers);
                        //                    doLoadRoles();
                    })
                    .error(function(e) {
                        console.log(e);
                        vm.message = e;
                    });
            } // init
        init();

        var doLoadApps = function() {
                console.log("authController doLoadApps ...");
                vm.message = "loading application  ...";

                appService.apps()
                    .success(function(data) {
                        console.log("data %j", data);
                        vm.consumers = data.consumers;
                        console.log("consumers list %j", vm.consumers);
                        doLoadRoles();
                    })
                    .error(function(e) {
                        console.log(e);
                        vm.message = e;
                    });
            } // doLoadApps

        var doLoadRoles = function() {
                console.log("authController doLoadRoles ...");

                vm.message = "loading roles . . .";
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
            } // doLoadRoles

        vm.addRule = function() {
            console.log("authController addRule ...");
            vm.rules.push({});
        }; // addRule

        vm.addPolicy = function() {
            console.log("authController addPolicy ...");

            vm.message = "Adding ...";
            console.log("vm %j", vm);
            authService.addPolicy({
                    domain_id: vm.domain_id,
                    policy_ver: vm.policy_ver,
                    application_id: vm.application_id,
                    rules: vm.rules,
                })
                .success(function(data) {
                    //                    console.log("data %j", data);
                    //                    vm.consumers = data.consumers;
                    //                    console.log("consumers list %j", vm.consumers);
                    vm.message = "";
                    alert("policy created!");
                    init();
                })
                .error(function(e) {
                    console.log("error %j", e);
                    vm.message = e;
                    //                    $scope.$apply();
                });
        }; // addPolicy
        
        vm.showPolicyWindow = function() {
            $window.open (vm.downloadPolicyUrl);
        } // showPolicyWindow

    }; // authController
})(); // function()