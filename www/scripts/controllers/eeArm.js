app.controller('eeArm', ['$scope', '$mdSidenav', '$mdBottomSheet', function ($scope, $mdSidenav, $mdBottomSheet) {
  $scope.openBottomSheet = function () {
    $mdBottomSheet.show({
      template: '<md-bottom-sheet>Hello!</md-bottom-sheet>'
    });
  };
}]);