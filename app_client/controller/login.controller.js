(function() {

    angular
        .module('fisecApp')
        .controller('loginController', loginController);
    loginController.$inject = ['$scope', '$uibModalInstance', 'loginService'];

    function loginController($scope, $uibModalInstance, loginService) {
        console.log("inside loginController ...");
        var vm = this;
        vm.onSubmit = function() {
            console.log("loginController onSubmit ...");
            vm.formError = "";
            if (!vm.formData.name || !vm.formData.password) {
                vm.formError = "user name and password are required, please try again";
                return false;
            } else {
                vm.doLogin(vm.formData);
            }
        }; // onSubmit

        vm.doLogin = function(formData) {
            console.log("loginController doLogin ...");
            loginService.login({
                    name: formData.name,
                    password: formData.password,
                    domainId: formData.domainId
                })
                .success(function(data) {
//                    console.log("loginController return data %j", data);
//                    vm.loginToken = data.token;
//                    console.log("loginController return token ..." + data.token);
                    vm.modal.close(data);
                })
                .error(function(data) {
                    if (typeof(data.messsage) == "undefined") {

                        vm.formError = data.message;
                    } else {
                        vm.formError = "User cannot be login, please try again";
                    }
                });
            return false;
        }; // doLogin

        vm.modal = {
            close: function(result) {
                $uibModalInstance.close(result);
            },
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            }
        }; //  vm.modal

    }; // loginController        

})(); // function()