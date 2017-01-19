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
		

});

App.controller("SidebarController", function($scope, $rootScope, serviceMarvel){


	$rootScope.valid = serviceMarvel.getComic("FComics");

	$scope.comics_fav = $rootScope.valid;

	console.log($rootScope.valid);
	
	
	if($rootScope.valid != "" && $rootScope.valid != null && typeof $rootScope.valid != "undefined"){
		$rootScope.boolList = false;
		// alert("muestra");
	}else{
		$rootScope.boolList = true;
		// alert("oculta");
	}

	$scope.deleteComic = function(id){

		var comics_fav = serviceMarvel.getComic("FComics");
		var arr = [];
		var i = 0;

		 for (var comics in comics_fav) {
			
			if(comics_fav[comics].id == id){
				delete comics_fav[comics];
			}
				if(typeof comics_fav[comics]!="undefined" && comics_fav[comics]!=null){
				arr[i] = comics_fav[comics];
				i++;
				}
				
			}
			console.log(arr);
			serviceMarvel.saveComic(arr);
			Materialize.toast('Comic remove from Favorites', 3000);
			setTimeout(function() {
				location.reload();
			}, 2000);
			


	};




});


