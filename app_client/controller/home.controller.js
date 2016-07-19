(function () {

  angular
    .module('fisecApp')
    .controller('homeController', homeController);

  homeController.$inject = ['$scope'];
  function homeController ($scope) {
      console.log("inside homeController ...");
    var vm = this;
    console.log(window.location);
    vm.pageHeader = {
      title: 'FiSec',
      strapline: 'Checing what is going on inside fiware security!'
    };
    vm.sidebar = {
      content: "The overall ambition of the Security Architecture of FIWARE is to demonstrate that the Vision of an Internet that is secure by design is becoming reality. Based on achievements to date and/or to come in the short-term (both from a technological but also a standardization perspective) we will show that secure by design is possible for the most important core (basic) and shared (generic) security features as anticipated by the FIWARE project and in accordance with the requirements of external stakeholders and users. Therefore, the secure by design concept will address both the security properties of the FIWARE platform itself and the applications that will be built on top of it. As such, the Security Architecture will focus on key security features such as identity management, access control or security monitoring to be delivered as so-called generic security enablers which, by design, can be integrated with other FIWARE GEs."
    };
    vm.message = "";

//    vm.getData = function (position) {
//      var lat = position.coords.latitude,
//          lng = position.coords.longitude;
//      vm.message = "Searching for nearby places";
//      loc8rData.locationByCoords(lat, lng)
//        .success(function(data) {
//          vm.message = data.length > 0 ? "" : "No locations found nearby";
//          vm.data = { locations: data };
//          console.log(vm.data);
//        })
//        .error(function (e) {
//          vm.message = "Sorry, something's gone wrong, please try again later";
//        });
//    };

//    vm.showError = function (error) {
//      $scope.$apply(function() {
//        vm.message = error.message;
//      });
//    };
//
//    vm.noGeo = function () {
//      $scope.$apply(function() {
//        vm.message = "Geolocation is not supported by this browser.";
//      });
//    };

//    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);

  }

})();