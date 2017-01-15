var App  = angular.module("MarvelChallenge", [
	"ngResource",
	"ui.materialize",
	"oc.lazyLoad",
	"ngRoute"
	]);

App.config(function($routeProvider){

	$routeProvider
		.when("/",{
			controller: "MarvelController",
			templateUrl: "app/views/home.html"
		})
});

App.controller("HeaderController", function($scope, $rootScope){

	$scope.bool = true;
	// alert($scope.bool);

	$scope.onSearch = function(){
		if($scope.bool=true){
			$scope.bool=false;
		}else{
			$scope.bool=true;
		}
	}

});


