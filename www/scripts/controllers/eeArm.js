app.controller('eeArm', ['$scope', '$mdSidenav', '$mdBottomSheet', function($scope, $mdSidenav, $mdBottomSheet) {
    $scope.resizeContent = function() {
        var backgroundWidth = 1024,
            backgroundHeight = 1124;
        var contentWidth = $('#content').width(),
            contentHeight = $('#content').height();
        var aspectRatio = backgroundWidth / backgroundHeight;

        	console.log(contentHeight,contentWidth / aspectRatio);
        // Check if content is too tall
        if (contentHeight > contentWidth / aspectRatio) {
            $('#robot-control-wrapper').css('height', contentWidth / aspectRatio);
        } else {
        	$('#robot-control-wrapper').css('height', contentHeight);
}
        	if (false) {}
    };
    $scope.openBottomSheet = function() {
        $mdBottomSheet.show({
            template: '<md-bottom-sheet>Hello!</md-bottom-sheet>'
        });
    };

    $scope.resizeContent();
}]);