app.controller('eeArm', ['$scope', '$http', '$mdSidenav', '$mdBottomSheet', '$mdDialog', function($scope, $http, $mdSidenav, $mdBottomSheet, $mdDialog) {
	$scope.settings = {
		increments: {
			base: 12,
			body: 12,
			neck: 12,
			claw: 12
		}
	};

	var connected = false,
		busy = false,
		robot = {},
		increment = 10,
		clawIncrement = 5,
		host = "http://192.168.4.1";

	var setRobotState = function(data) {
		robot.base = data.base;
		robot.body = data.body;
		robot.neck = data.neck;
		robot.claw = data.claw;
	}

	var moveTo = function(robot) {
		busy = true;
		$.get(host + "/arm", {
				base: robot.base,
				body: robot.body,
				neck: robot.neck,
				claw: robot.claw
			},
			function(data) {
				setRobotState(data);
			});
		busy = false;
	};

	var addStep = function(robot, steps, delay) {
		busy = true;
		$.get(host + "/add", {
			base: robot.base,
			body: robot.body,
			neck: robot.neck,
			claw: robot.claw,
			steps: steps,
			delay: delay
		});
		busy = false;
	};

	var saveSteps = function() {
		busy = true;
		$.get(host + "/savesteps");
		busy = false;
	};

	var clearLastStep = function() {
		busy = true;
		$.get(host + "/pop");
		busy = false;
	};

	var clearSteps = function() {
		busy = true;
		$.get(host + "/clear");
		busy = false;
	};

	var playSteps = function() {
		busy = true;
		$.get(host + "/go", null, function(data) {
			setRobotState(data);
		});
		busy = false;
	};

	var goToStart = function() {
		busy = true;
		$.get(host + "/gostart", null, function(data) {
			setRobotState(data);
		});
		busy = false;
	};

	$scope.baseRotateRight = function() {
		if (!connected || robot.base == 0 || busy) {
			return;
		}

		robot.base -= $scope.settings.increments.base;

		if (robot.base < 0) {
			robot.base = 0;
		}

		moveTo(robot);
	};

	$scope.baseRotateLeft = function() {
		if (!connected || robot.base == 180 || busy) {
			return;
		}

		robot.base += $scope.settings.increments.base;

		if (robot.base > 180) {
			robot.base = 180;
		}

		moveTo(robot);
	};

	$scope.bodyMoveForward = function() {
		if (!connected || robot.base == 180 || busy) {
			return;
		}

		robot.body += $scope.settings.increments.body;

		if (robot.body > 180) {
			robot.body = 180;
		}

		moveTo(robot);
	};

	$scope.bodyMoveBackward = function() {
		if (!connected || robot.body == 0 || busy) {
			return;
		}

		robot.body -= $scope.settings.increments.body;

		if (robot.body < 0) {
			robot.body = 0;
		}

		moveTo(robot);

	}
	$scope.neckMoveUp = function() {
		if (!connected || robot.neck == 0 || busy) {
			return;
		}

		robot.neck += $scope.settings.increments.neck;

		if (robot.neck > 180) {
			robot.neck > 180;
		}

		moveTo(robot);
	};

	$scope.neckMoveDown = function() {
		if (!connected || robot.neck == 0 || busy) {
			return;
		}

		robot.neck -= $scope.settings.increments.neck;

		if (robot.neck < 0) {
			robot.neck = 0;
		}

		moveTo(robot);
	};

	$scope.clawOpen = function() {
		if (!connected || robot.claw == 0 || busy) {
			return;
		}

		robot.claw -= $scope.settings.increments.claw;

		if (robot.claw < 0) {
			robot.claw = 0;
		}

		moveTo(robot);
	};

	$scope.clawClose = function() {
		if (!connected || robot.claw == 180 || busy) {
			return;
		}

		robot.claw += $scope.settings.increments.claw;

		if (robot.claw > 180) {
			robot.claw = 180;
		}

		moveTo(robot);
	};

	$scope.addStep = function() {
		if (connected) {
			addStep(robot, 0, 500);
		}
		$mdBottomSheet.hide();
	};

	$scope.saveSteps = function() {
		if (connected) {
			saveSteps();
		}
		$mdBottomSheet.hide();
	};

	$scope.clearLastStep = function() {
		if (connected) {
			clearLastStep();
		}
		$mdBottomSheet.hide();
	};

	$scope.clearSteps = function() {
		if (connected) {
			clearSteps();
		}
		$mdBottomSheet.hide();
	};

	$scope.playSteps = function() {
		if (connected) {
			playSteps();
		}
		$mdBottomSheet.hide();
	};

	$scope.goToStart = function() {
		if (connected) {
			goToStart();
		}
		$mdBottomSheet.hide();
	};

	$scope.resizeContent = function() {
		var backgroundWidth = 1024,
			backgroundHeight = 1124;
		var contentWidth = $('#content').width(),
			contentHeight = $('#content').height();
		var aspectRatio = backgroundWidth / backgroundHeight;

		// Check if content is too tall
		if (contentHeight > contentWidth / aspectRatio) {
			$('#robot-control-wrapper').css('height', contentWidth / aspectRatio);
		} else {
			$('#robot-control-wrapper').css('height', contentHeight);
		}

		// Check if content is too wide
		if (contentWidth > contentHeight * aspectRatio) {
			$('#robot-control-wrapper').css('width', contentHeight * aspectRatio);
		} else {
			$('#robot-control-wrapper').css('width', contentWidth);
		}
	};

	$scope.openSideNav = function() {

		$mdSidenav('left').open();
	};

	$scope.openBottomSheet = function() {
		$mdBottomSheet.show({
			templateUrl: 'templates/bottom-sheet.html',
			controller: 'eeArm'
		});
	};
	$http.get(host + "/arm", {
		timeout: 5000,
		cache: false
	}).then(function(data) {
		setRobotState(data);
		connected = true;

	});

	$scope.resizeContent();
}]);

app.controller('sideNav', ['$scope', '$mdSidenav', '$mdDialog', function($scope, $mdSidenav, $mdDialog) {

	$scope.openSettings = function() {
		$mdDialog.show({
			controller: 'settingsDialog',
			templateUrl: 'templates/settings-dialog.html',
			clickOutsideToClose: true
		});
	};

	$scope.close = function() {
		$mdSidenav('left').close();
	};
}]);

app.controller('settingsDialog', ['$scope', '$mdDialog', '$timeout', function($scope, $mdDialog, $timeout) {
	$scope.settingsFetched = false;

	$timeout(function() {
		$scope.settingsFetched = true;
	}, 1000);

	$scope.settings = {
		name: "Hi"
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};
}]);