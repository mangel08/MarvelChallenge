App.controller("MarvelController", function ($scope, $rootScope, serviceMarvel){
 
	$scope.sort = "Sort";
	

	

	$scope.getAllCharacters = function(cont,cont2,name){
	$scope.loader = true;
	var x = serviceMarvel.getAllCharacters($rootScope.apikey);
	x.then(function(response){

		$scope.comic_obj = [];
		
		for (var i = cont; i < cont2; i++) {
			var comic_obj = new Object();
			comic_obj.name = response.data.data.results[i].name;
			$scope.total = response.data.data.limit;
			
			var cad = "I am a very simple card. I am good at containing small bits of information.I am convenient because I require little markup to use effectively";
			
			if(response.data.data.results[i].description==""){
				comic_obj.description = cad;
			}else{
			comic_obj.description = response.data.data.results[i].description;
			}

			let path = response.data.data.results[i].thumbnail.path;
			let variant = "/landscape_xlarge";
			let ext = "."+response.data.data.results[i].thumbnail.extension;
			let photo_url =  path+variant+ext;

			comic_obj.photo_url = photo_url;
			comic_obj.cont = i;
			comic_obj.comics = [];

			for (var j = 0; j < response.data.data.results[i].comics.items.length; j++) {
				
				if(response.data.data.results[i].comics.items.length > 0){
					// console.log(response.data.data.results[i].comics.items[j]);
					// if(j<=3){
						comic_obj.comics.push(response.data.data.results[i].comics.items[j].name);
					// }

				}
				
				
			}

			$scope.comic_obj.push(comic_obj);

			

		}
		console.log($scope.comic_obj);

		

		console.log(response.data);
		$scope.loader = false;

		},function(errorMsg){
	      	console.log(errorMsg);
	      	console.log("Error en el servidor");
	    });
	};

	$scope.changePage = function(page){
		
		var cont = 0;
		var cont2 = 10;

		if(page>1){
		for (var i = 0; i < page-1; i++) {
			cont = cont+10;
			cont2 = cont2+10;
		}
		}
		console.log(cont + " - " + cont2)
		$scope.getAllCharacters(cont,cont2)

	}

	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}
	
	
});