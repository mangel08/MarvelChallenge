App.controller("MarvelController", function ($scope, $rootScope, serviceMarvel){
 
	$scope.sort = "Sort";

	$scope.getAllCharacters = function(){
	var x = serviceMarvel.getAllCharacters($rootScope.apikey);
	x.then(function(response){

		$scope.name_character = response.data.data.results[0].name;
		let path = response.data.data.results[0].thumbnail.path;
		let variant = "/landscape_incredible";
		let ext = "."+response.data.data.results[0].thumbnail.extension;
		$scope.photo_url = path+variant+ext;

		console.log(response.data);

		},function(errorMsg){
	      	console.log(errorMsg);
	      	console.log("Error en el servidor");
	    });
	};

	
	
});