app.controller('eeArm', ['$scope', '$mdSidenav', '$mdBottomSheet', function($scope, $mdSidenav, $mdBottomSheet) {
	var settings = {
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
		host = "http://GwaArm.local";

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

	$.get(host + "/arm", null, function(data) {
		setRobotState(data);
		connected = true;

	})

	$scope.baseRotateRight = function() {
		if (!connected || robot.base == 0 || busy) {
			return;
		}

		robot.base -= settings.increments.base;

		if (robot.base < 0) {
			robot.base = 0;
		}

		moveTo(robot);
	};

	$scope.baseRotateLeft = function() {
		if (!connected || robot.base == 180 || busy) {
			return;
		}

		robot.base += settings.increments.base;

		if (robot.base > 180) {
			robot.base = 180;
		}

		moveTo(robot);
	};

	$scope.bodyMoveForward = function() {
		if (!connected || robot.base == 180 || busy) {
			return;
		}

		robot.body += settings.increments.body;

		if (robot.body > 180) {
			robot.body = 180;
		}

		moveTo(robot);
	};

	$scope.bodyMoveBackward = function() {
		if (!connected || robot.body == 0 || busy) {
			return;
		}

		robot.body -= settings.increments.body;

		if (robot.body < 0) {
			robot.body = 0;
		}

		moveTo(robot);

	}
	$scope.neckMoveUp = function() {
		if (!connected || robot.neck == 0 || busy) {
			return;
		}

		robot.neck += settings.increments.neck;

		if (robot.neck > 180) {
			robot.neck > 180;
		}

		moveTo(robot);
	};

	$scope.neckMoveDown = function() {
		if (!connected || robot.neck == 0 || busy) {
			return;
		}

		robot.neck -= settings.increments.neck;

		if (robot.neck < 0) {
			robot.neck = 0;
		}

		moveTo(robot);
	};

	$scope.clawOpen = function() {
		if (!connected || robot.claw == 0 || busy) {
			return;
		}

		robot.claw -= settings.increments.claw;

		if (robot.claw < 0) {
			robot.claw = 0;
		}

		moveTo(robot);
	};

	$scope.clawClose = function() {
		if (!connected || robot.claw == 180 || busy) {
			return;
		}

		robot.claw += settings.increments.claw;

		if (robot.claw > 180) {
			robot.claw = 180;
		}

		moveTo(robot);
	};

	$scope.addStep = function() {
		if (connected) {
			addStep(robot, 0, 500);
		}
	};

	$scope.saveSteps = function() {
		if (connected) {
			saveSteps();
		}
	};

	$scope.clearLastStep = function() {
		if (connected) {
			clearLastStep();
		}
	};

	$scope.clearSteps = function() {
		if (connected) {
			clearSteps();
		}
	};

	$scope.playSteps = function() {
		if (connected) {
			playSteps();
		}
	};

	$scope.goToStart = function() {
		if (connected) {
			goToStart();
		}
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

	$scope.openBottomSheet = function() {
		$mdBottomSheet.show({
			template: '<md-bottom-sheet>Hello!</md-bottom-sheet>'
		});
	};

	$scope.resizeContent();
}]);