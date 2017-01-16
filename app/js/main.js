var App  = angular.module("MarvelChallenge", [
	'ngResource',
	'ui.materialize',
	'oc.lazyLoad',
	'ngRoute',
	'LocalStorageModule'
	]);

App.config(function($routeProvider){

	$routeProvider
		.when("/",{
			controller: "MarvelController",
			templateUrl: "app/views/home.html"
		})

		// .when("/header",{
		// 	controller: "HeaderController",
		// 	templateUrl: "app/tpl/header.html"
		// })


});

App.controller("HeaderController", function($scope, $rootScope){
	$(document).ready(function() {
	$(".button-collapse").sideNav();
	});
	
	$scope.bool = true;
	// alert($scope.bool);

	// $scope.search = "Captain America";
	// console.log($scope.search);

	$scope.onSearch = function(){
		if($scope.bool==true){
			$scope.bool=false;
		}else{
			$scope.bool=true;
		}

		console.log($scope.bool);
	}

});


