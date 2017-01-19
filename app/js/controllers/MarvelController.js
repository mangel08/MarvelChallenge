App.controller("MarvelController", function ($scope, $rootScope, $window, serviceMarvel){
 
    /* * * * * * * * * * * * * * * * * * * * * * 
     * * * * AUTOR: MIGUELANGEL PALMA  * * * * * 
     * * DESARROLLADOR WEB & MOBILE ANDROID *  *
     * * * * * CARACAS - VENEZUELA * * * * * * * 
     * * * * * * * * * * * * * * * * * * * * * */

	$scope.sort = "Sort";
	$scope.selected = "true";	
	$scope.boolFav = false;
	$scope.query = "";
	$scope.filter = {};
	$scope.comic_obj = [];
	$scope.loader = true;
	$scope.boolp = false;

	$scope.flag = serviceMarvel.getFlag("Flag");
	$scope.id = serviceMarvel.getCharact("Charact");

	// FUNCION PARA VALIDAR LA CARGA DE DATOS 
	$scope.getAllCharacters = function(bool){

	if(bool == false || bool == null){
		console.log(bool);

		// LOAD All Characters
		$scope.getCharacters(0,10);
		$scope.getAll();

	}else{
		
		// LOAD CHARACTER BY ID
		$scope.getAll();
		$scope.getCharacterById($scope.id);
	}
	
	};

	// FUNCION SCOPE PARA HACER LLAMADO AL SERVICE ALL CHARACTERS
	$scope.getCharacters = function(cont,cont2,name){
		
		// $scope.loader = true;
		var x = serviceMarvel.getAllCharacters($rootScope.apikey);
		x.then(function(response){

		$scope.comic_obj = [];
		
		for (var i = cont; i < cont2; i++) {
			var comic_obj = new Object();
			comic_obj.name = response.data.data.results[i].name;
			$scope.total = response.data.data.count;
			
			var cad = "I am a super hero of MARVEL comics";
			
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
					
						obj_comic = new Object();
						obj_comic.name = response.data.data.results[i].comics.items[j].name;
						var aux = response.data.data.results[i].comics.items[j].resourceURI.split("/");
						obj_comic.id = aux[aux.length-1];
						comic_obj.comics.push(obj_comic);
						
				}
			}
			$scope.comic_obj.push(comic_obj);
		}
			// console.log($scope.comic_obj);
			// console.log(response.data);
			
			// console.log($scope.loader);

			$scope.loader = false;

		},function(errorMsg){
	      	console.log(errorMsg);
	      	console.log("Error en el servidor");
	    });
	}

	// FUNCION PARA GUARDAR TODOS LOS CHARACTERS EN LOCALSTORAGE
	$scope.getAll = function(){

		var obj = new Object();	
		var obj2 = new Object();																
		var x = serviceMarvel.getAllCharacters($rootScope.apikey);
		x.then(function(response){

			for (var i = 0; i < response.data.data.results.length; i++) {
				
				let path = response.data.data.results[i].thumbnail.path;
				let ext = response.data.data.results[i].thumbnail.extension;
				let variant = "/standard_medium.";
				let id = response.data.data.results[i].id;

				obj[response.data.data.results[i].name] = path+variant+ext;
				obj2[response.data.data.results[i].name] = id;

			}
			$('input.autocomplete').autocomplete({
			    	data : obj
			    
			  });
			console.log(obj);
			serviceMarvel.saveCharacters(obj2);
			
				
				console.log($scope.filter);
			console.log("getALL");

		},function(errorMsg){
	      	console.log(errorMsg);
	      	console.log("Error en el servidor");
	    });

	};

	// FUNCION PARA CAMBIAR DE PAGINA
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
		$scope.getCharacters(cont,cont2)

	};
	
	// FUNCION PARA ABRIR MODAL DE UN COMIC
	$scope.selectComic = function(name, id){
			
			// alert(name +" - "+ id);	
			$scope.elementId = $("[title='"+name+"']:hidden").attr("title");
			// alert(elementId);
			var array = serviceMarvel.getComic();

			$scope.boolFav = $scope.findFavs(array,id);
			console.log($scope.boolFav);
			$scope.getComicById(id);

			if($scope.elementId == name){
				setTimeout(function() {
					$("[title='"+name+"']").show();
					$('#modal1').modal('open');
					
				}, 1000);
				

			}

	};

	// FUNCION SCOPE PARA BUSCAR UN COMIC POR ID MEDIANTE EL SERVICE getComicById()
	$scope.getComicById = function(id){

		var x = serviceMarvel.getComicById($rootScope.apikey, id);
		x.then(function(response){

			console.log(response.data);

			$scope.comic_detail = new Object();
			$scope.comic_detail.title = response.data.data.results[0].title;
			$scope.comic_detail.id = response.data.data.results[0].id;
			$scope.comic_detail.price = response.data.data.results[0].prices[0].price;
			
			var cad = "No description available";

			if(response.data.data.results[0].description != "" && response.data.data.results[0].description != null){
				cad = response.data.data.results[0].description;
			}

			$scope.comic_detail.description = cad;
			let path = response.data.data.results[0].thumbnail.path;
			let ext = response.data.data.results[0].thumbnail.extension;
			let variant = "/portrait_incredible.";
			$scope.comic_detail.img = path+variant+ext;

			console.log($scope.comic_detail);

		},function(errorMsg){
	      	console.log(errorMsg);
	      	console.log("Error en el servidor");
	    });


	};

	// FUNCION SCOPE PARA GUARDAR UN COMIC EN LOCALSTORAGE Y MOSTRARLO EN FAVORITOS
	$scope.saveComic  = function(title, img, id){
		console.log(title + " - " + img + " - " + id);
		$rootScope.validate = serviceMarvel.getComic("FComics");
		var comics_list = [];
		var comic = new Object();


		if($rootScope.validate != "" && $rootScope.validate!=null){
		var comics_list = $rootScope.validate;
		// alert("Ya hay lista");


		 for (var aux in $rootScope.validate) {


		 		if($rootScope.validate[aux].id == id){

		 			break;
		 		}

		 }

		}

		comic.title = title;
		comic.img = img;
		comic.id = id;

		comics_list.push(comic);

		console.log(comics_list);

		serviceMarvel.saveComic(comics_list);
		 var $toastContent = $('<span>Comic saved in favorites</span>');
  		Materialize.toast($toastContent, 5000);
		$rootScope.boolList = false;
		 $('#modal1').modal('close');

		setTimeout(function() {
				location.reload();
		}, 2000);
		
	};

	/* FUNCION SCOPE PARA VALIDAR EXISTENCIA DE COMICS EN LOCALSTORAGE
	 * SI RETORNA TRUE EXISTE EL COMIC EN FAVORITOS, SI NO RETORNARA FALSE*/
	$scope.findFavs = function(array, id){
		var bool = false;
		 for (var aux in array) {
		 	if(array[aux].id == id){
		 		// alert(array[aux].id +"--"+ id);
		 		bool = true;
		 		break;

		 	}else if(array[aux].id != id){
		 		// alert(array[aux].id +"--"+ id);
		 		bool = false;
		 		
		 	}
		 }

		 return bool;

	};

		/*FUNCION SCOPE CALLBACK PARA HACER MATCH DE UN CHARACTER
		  MEDIANTE EL NOMBRE Y ASOCIANDOLO A SU ID PARA LUEGO 
		  GUARDARLO EN LOCALSTORAGE*/
		$scope.callBackCharact = function(name){

			var charact = serviceMarvel.getCharacters("Characters");
			var id = 0;
			console.log(charact);

			 for (var aux in charact) {

			 	if(aux == name){
			 		id = charact[aux];
			 		serviceMarvel.saveCharact(id);
			 		// alert(id);
			 		// console.log(id);
			 		break;
			 	}

			 }

			 serviceMarvel.saveFlag(true);

			 setTimeout(function() {
				location.reload();
			}, 2000);
		}

		/*FUNCION SCOPE PARA BUSCAR UN CHARACTER POR ID*/
		$scope.getCharacterById = function(id){

			var x = serviceMarvel.getCharacterById($rootScope.apikey,id);
			 x.then(function(response){
			 
			 	
			 	$scope.comic_obj = [];
				console.log(response.data);

				var comic_obj = new Object();
				comic_obj.name = response.data.data.results[0].name;
				$scope.total = response.data.data.count;
				
				var cad = "I am a super hero of MARVEL comics";
				
				if(response.data.data.results[0].description==""){
					comic_obj.description = cad;
				}else{
				comic_obj.description = response.data.data.results[0].description;
				}

				let path = response.data.data.results[0].thumbnail.path;
				let variant = "/landscape_xlarge";
				let ext = "."+response.data.data.results[0].thumbnail.extension;
				let photo_url =  path+variant+ext;

				comic_obj.photo_url = photo_url;
				comic_obj.cont = 0;
				comic_obj.comics = [];

				if(response.data.data.results[0].comics.items.length >= 1){
					
					for (var i = 0; i < response.data.data.results[0].comics.items.length; i++) {
						
						obj_comic = new Object();
						obj_comic.name = response.data.data.results[0].comics.items[i].name;
						var aux = response.data.data.results[0].comics.items[i].resourceURI.split("/");
						obj_comic.id = aux[aux.length-1];
						comic_obj.comics.push(obj_comic);
					}
					
				}
					$scope.comic_obj.push(comic_obj);
					console.log($scope.comic_obj);
				
					serviceMarvel.saveFlag(false);
					$scope.loader = false;

			},function(errorMsg){
	      	console.log(errorMsg);
	      	console.log("Error en el servidor");

	      		serviceMarvel.saveFlag(false);
	    });
		
	}

	// FUNCION PARA DESORNEDAR UN ARREGLO
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;
	
	  while (0 !== currentIndex) {
	   
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	   
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

  	 // FUNCION PARA CERRAR MODAL 
	 $scope.closeModal = function(name){
	 	$("[title='"+$scope.elementId+"']").hide();
	 	 $('#modal1').modal('close');
	 	 
	 };
});