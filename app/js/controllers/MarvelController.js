App.controller("MarvelController", function ($scope, $rootScope, serviceMarvel){
 
	$scope.sort = "Sort";
	console.log($rootScope.apikey);

	$scope.getAllCharacters = function(){
	var x = serviceMarvel.getAllCharacters($rootScope.apikey)
	x.then(function(response){

		console.log(response);

		},function(errorMsg){
	      	console.log(errorMsg);
	      	console.log("Error en el servidor");
	    });
	};

	$scope.getAllCharacters();
	
});