'use strict';

var myApp = angular.module('myApp.controllers', ['myApp.services']);

// Define the MainController on the myApp module
myApp.controller('MainCtrl', function MainCtrl($scope, Astronaut) {
	$scope.input = {
		username:'',
		email:'',
		dog:'',
		error:false
	};
	$scope.output = {
		buddy:false,
		show:false
	};
	$scope.pickedUsers = [];
	// LOAD USERS JSON FILE
	Astronaut.get().then(function (msg) {
        $scope.users = msg.data.astronauts;
    });
	// CHECK LOCAL STORAGE DATA 
	var checkPickedUsers = JSON.parse(localStorage.getItem('pickedUsers'));
	$scope.output.show = (checkPickedUsers === null) ? 'committee' : 'astronaut';
	$scope.pickedUsers = checkPickedUsers;
	// FUNCTION GET BUDDY
	function getNewArray(n) {
		var arr1 =[], arr2 =[];
		for(var i=0; i<n; i++){
			arr1[i]=i;
			arr2[i]=i;
		}
		var check = false;
		while (check!==true) {
			arr1.sort(function(){ return 0.5 - Math.random() });
			check = true;
			for (var i=0; i<arr1.length; i++) {
				if (arr1[i] == arr2[i]) {
					check = false;
					break;
				}
			}
		}
		return arr1;
	}
	// ACTION 1: LAUNCH
	$scope.launch=function() {
		$scope.pickedUsers = [];
		var ul = $scope.users.length;
		var newArray = getNewArray(ul);
		// SET Astronauts
		for (var i=0; i<newArray.length; i++) {
			(function(){
				var pickUser = {
					user : $scope.users[i].guid,
					name : $scope.users[i].name.first + " " + $scope.users[i].name.last,
					dog : false,
					pick : $scope.users[newArray[i]].name.first + " " + $scope.users[newArray[i]].name.last
				};
				$scope.pickedUsers.push(pickUser);
				//console.warn(i+" : "+$scope.pickedUsers[i].name+" -> "+$scope.pickedUsers[i].pick);
			})(i);
		}
		localStorage.setItem('pickedUsers', JSON.stringify($scope.pickedUsers));
		
    };
	// ACTION 2: LOGIN
	$scope.login=function() {
		$scope.input.error = "";
		if ($scope.pickedUsers.length === 0) {
			$scope.input.error = "Please Launch it first to assign Buddy";
		} else if ($scope.input.username !== $scope.input.email 
			|| $scope.input.username == ''
			|| $scope.input.email == '') {
			$scope.input.error = "Please Select your correct Name and Email";
		} else if ($scope.input.dog == '') {
			$scope.input.error = "Please Tick to take Dog or not";
		} else {
			for (var i=0; i<$scope.pickedUsers.length; i++) {
				if ($scope.pickedUsers[i].user === $scope.input.username) {
					$scope.pickedUsers[i].dog = $scope.input.dog;
					$scope.output.buddy = $scope.pickedUsers[i].pick;
				}
			}
			localStorage.setItem('pickedUsers', JSON.stringify($scope.pickedUsers));
		}
    };
	// ACTION 3: LAUNCH
	$scope.closeLaunch=function() {
		// REFRESH PAGE
        window.location.reload();
    };
	
});
	
	
