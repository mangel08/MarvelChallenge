App.service("serviceMarvel", function ($rootScope, $resource, $q, $http, localStorageService) {

    /* * * * * * * * * * * * * * * * * * * * * * 
     * * * * AUTOR: MIGUELANGEL PALMA  * * * * * 
     * * DESARROLLADOR WEB & MOBILE ANDROID *  *
     * * * * * CARACAS - VENEZUELA * * * * * * * 
     * * * * * * * * * * * * * * * * * * * * * */

    /* * * * * * * * * * * * * * * * * * * * * * * * *
     * V A R I A B L E S  I N I C I A L I Z A D A S * *
     * * * * * * * * * * * * * * * * * * * * * * * * * */

	 const ts = new Date().getTime(); // TIMESTAMP
	 const private_key = 'e8f66ecba4510b045fb9b2ed4ed4555c4b9bcaea'; // PRIVATE KEY
	 const public_key = 'f3d210614fe32cc4e9ed7f83ec4978c2'; // PUBLIC KEY
	 const apikey = md5(ts+private_key+public_key); // HASH
     const time = "ts=";
     const apk = "&apikey=";
     const hash = "&hash="
     var iron_man = "573"
	 $rootScope.apikey = apikey;
	
    
	 const base_url = 'https://gateway.marvel.com/'; //BASE  URL

            	 /* * * * * * * * * * * * * * * * * * * * * * * * *
                  * *   S E R V I C E S   A P I   M A R V E L * * *
                  * * * * * * * * * * * * * * * * * * * * * * * * */

            // SERVICES GET ALL CHARACTERS
            this.getAllCharacters = function(key){
            var defered = $q.defer();
            $http({
                method : 'GET',
                url: base_url+"v1/public/characters?ts="+ts+"&apikey="+public_key+"&hash="+key+"&limit=100&offset=573",
                headers: 
                    {
                    'Content-Type': 'application/json'
                    },

            }).then(function(response) {
                defered.resolve(response); 
            }, function(errorMsg){
                defered.reject(errorMsg);
            });
                return defered.promise;
            };

             // SERVICES GET COMIC BY ID
            this.getComicById = function(key,id){
                var defered = $q.defer();
                $http({
                    method : 'GET',
                    url: base_url+'/v1/public/comics/'+id+"?"+time+ts+apk+public_key+hash+key,
                     headers: 
                    {
                    'Content-Type': 'application/json'
                    },
                }).then(function(response) {
                    defered.resolve(response); 
                    }, function(errorMsg){
                        defered.reject(errorMsg);
                    });
                        return defered.promise;
                    };
            
             // SERVICES GET CHARACTER BY ID
            this.getCharacterById = function(key,id){
                var defered = $q.defer();

                $http({
                    method : 'GET',
                    url: base_url+'/v1/public/characters/'+id+"?"+time+ts+apk+public_key+hash+key,
                     headers: 
                    {
                    'Content-Type': 'application/json'
                    },
                }).then(function(response) {
                    defered.resolve(response); 
                    }, function(errorMsg){
                        defered.reject(errorMsg);
                    });
                        return defered.promise;
                    };


            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             * * * F U N C I O N E S * L O C A L * S T O R A G E * * * 
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 

            //LOCALSTORAGE PARA GUARDAR UN OBJ COMIC
            this.saveComic = function saveComic(obj) {
                localStorageService.set("FComics", "");
                localStorageService.set("FComics", obj);
            };
            
            // LOCALSTORAGE PARA OBTENER UN OBJ COMIC
            this.getComic = function getComic() {
                 return localStorageService.get("FComics");
             };

            //LOCALSTORAGE  PARA GUARDAR UN OBJETO CHARACTERS
            this.saveCharacters = function saveCharacters(list) {
                localStorageService.set("Characters", "");
                localStorageService.set("Characters", list);
            };
            
            // LOCALSTORAGE UNA LISTA DE CHARACTERS
            this.getCharacters = function getCharacters() {
                 return localStorageService.get("Characters");
             };
            
            // LOCALSTORAGE PARA GUARDAR UN FLAG
          this.saveFlag = function saveFlag(bool) {
                localStorageService.set("Flag", false);
                localStorageService.set("Flag", bool);
            };
            
            // LOCALSTORAGE OBTENER UN FLAG
            this.getFlag = function getFlag() {
                 return localStorageService.get("Flag");
             };
            
            // LOCALSTORAGE PARA GUARDAR UN ID CHARACTER
            this.saveCharact = function saveCharact(id) {
                localStorageService.set("Charact", "");
                localStorageService.set("Charact", id);
            };
            
            // LOCALSTORAGE PARA OBTENER UN ID CHARACTER
            this.getCharact = function getCharact() {
                 return localStorageService.get("Charact");
             };

});