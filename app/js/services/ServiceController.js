App.service("serviceMarvel", function ($rootScope, $resource, $q, $http, localStorageService) {

	 const ts = new Date().getTime();
	 const private_key = 'e8f66ecba4510b045fb9b2ed4ed4555c4b9bcaea';
	 const public_key = 'f3d210614fe32cc4e9ed7f83ec4978c2';
	 const apikey = md5(ts+private_key+public_key);
     const time = "ts=";
     const apk = "&apikey=";
     const hash = "&hash="
     var iron_man = "573"
	 $rootScope.apikey = apikey;
	
	 const base_url = 'https://gateway.marvel.com/';

            	 /* * * * * * * * * * * * * * * * * * * * * * * * *
                  * *   S E R V I C E S   A P I   M A R V E L * * *
                  * * * * * * * * * * * * * * * * * * * * * * * * */


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

            this.saveComic = function saveComic(obj) {
                localStorageService.set("FComics", "");
                localStorageService.set("FComics", obj);
            };

            this.getComic = function getComic() {
                 return localStorageService.get("FComics");
             };
        


            this.saveCharacters = function saveCharacters(obj) {
                localStorageService.set("Characters", "");
                localStorageService.set("Characters", obj);
            };

            this.getCharacters = function getCharacters() {
                 return localStorageService.get("Characters");
             };

          this.saveFlag = function saveFlag(bool) {
                localStorageService.set("Flag", false);
                localStorageService.set("Flag", bool);
            };

            this.getFlag = function getFlag() {
                 return localStorageService.get("Flag");
             };

            this.saveCharact = function saveCharact(id) {
                localStorageService.set("Charact", "");
                localStorageService.set("Charact", id);
            };

            this.getCharact = function getCharact() {
                 return localStorageService.get("Charact");
             };

});