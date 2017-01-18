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

	 //SERVICIO PARA AGREGAR EVENTOS
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
            

        this.saveComic = function saveComic(obj) {
            localStorageService.set("FComics", "");
            localStorageService.set("FComics", obj);
        };

        this.getComic = function getComic() {
             return localStorageService.get("FComics");
         };
        



});