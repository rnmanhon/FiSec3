(function() {
    angular
        .module('fisecApp')
        .controller('addAppController', addAppController);

    addAppController.$inject = ['$uibModalInstance', '$scope', 'userService', 'creator'];

    function addAppController($uibModalInstance, $scope, userService, creator) {
        console.log("inside addAppController ...");
        var vm = this;

        vm.onSubmit = function() {
            console.log("addAppController onSubmit ...");
            vm.formError = "";
//            if (!vm.formData.name || !vm.formData.password) {
//                vm.formError = "user name and password are required, please try again";
//                return false;
//            } else {
//                vm.doAddUser(creator.userToken, vm.formData);
//            }
        }; // onSubmit

//        vm.doAddUser = function(userToken, formData) {
//            console.log("addUserController doAddUser ...");
//            console.log("token " + userToken);
//            console.log("formData %j", formData);
//
//            userService.addUser({
//                    userToken: userToken,
//                    name: formData.name,
//                    userName: formData.userName,
//                    defaultProjectId: formData.defaultProjectId,
//                    description: formData.description,
//                    domainId: formData.domainId,
//                    email: formData.email,
//                    enabled: formData.enabled,
//                    password: formData.password
//                })
//                .success(function(data) {
//                    alert("user created!");
//                    vm.modal.close(data);
//                })
//                .error(function(data) {
//                    vm.formError = "User cannot be created, please try again";
//                });
//            return false;
//        }; // doAddUser
//
//        vm.modal = {
//            close: function(result) {
//                $uibModalInstance.close(result);
//            },
//            cancel: function() {
//                $uibModalInstance.dismiss('cancel');
//            }
//        }; 

    }; // addAppController

})(); // (function()