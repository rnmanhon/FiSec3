(function() {
    angular
        .module('fisecApp')
        .controller('addRoleController', addRoleController);

    addRoleController.$inject = ['$uibModalInstance', '$scope', 'roleService', 'creator'];

    function addRoleController($uibModalInstance, $scope, roleService, creator) {
        console.log("inside addUserController ...");
        var vm = this;

        vm.onSubmit = function() {
            console.log("addUserController onSubmit ...");
            vm.formError = "";
            if (!vm.formData.name ) {
                vm.formError = "role name and is required, please try again";
                return false;
            } else {
                vm.doAddRole(creator.userToken, vm.formData);
            }
        }; // onSubmit

        vm.doAddRole = function(userToken, formData) {
            console.log("addRoleController doAddRole ...");
            console.log("token " + userToken);
            console.log("formData %j", formData);

            roleService.addRole({
                    userToken: userToken,
                    name: formData.name,
                    application_id: formData.application_id,
                })
                .success(function(data) {
                    alert("role created!");
                    vm.modal.close(data);
                })
                .error(function(data) {
                    vm.formError = "Role cannot be created, please try again";
                });
            return false;
        }; // doAddUser

        vm.modal = {
            close: function(result) {
                $uibModalInstance.close(result);
            },
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            }
        };

    }; // addUserController

})(); // (function()