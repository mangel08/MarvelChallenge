App.controller("MarvelController", function ($scope, $rootScope){

	$scope.hola = "XD";

	$scope.bool = true;
	console.log($scope.bool);

	$scope.onSearch = function(){
		if($scope.bool=true){
			$scope.bool=false;
		}else{
			$scope.bool=true;
		}
	}
	
	
});