angular.module('CollectionComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('collection',{
                url:'/',
                templateUrl:'./components/collection/collection.html',
                controller:'collectionCtrl'
            })
    }])

    .controller('collectionCtrl',["$scope","$css","getData",function($scope,$css,getData){
        $css.add('./components/collection/collection.css');
       
       
//      var arr=[];
//      var arr1=[];
//      var n = -1;
//      console.log(window.localStorage);
//      for(var j in window.localStorage){
//      	n++;
//      	if(n == parseInt(window.localStorage.length){
//      		return;
//      	}else if(j.toString().indexOf("collection")!=-1){
//      		arr1.push(JSON.parse(window.localStorage.getItem(j));
//      	}
////      	if(j.toString().indexOf("collection")!=-1){
////      		arr1.push(JSON.parse(window.localStorage.getItem(j));
////      	}
//      	$scope.items=arr1;
//      }
//		for(var i in window.localStorage) {
//			console.log(window.localStorage);
//			n++;
//
//			if(n == parseInt(window.localStorage.length)){
//				return;
//			}else{
//				var da = JSON.parse(window.localStorage.getItem(i));
//			arr.push(da);
//			$scope.items=arr;
//			}
//			
//
//		}
        
        
        
//      console.log(window.localStorage.length);
//		console.log(window.localStorage);
		var arr=[];
        for(var i in window.localStorage) {
        	if(i.indexOf("collection")!=-1){
//      		console.log(i);
//      		console.log(JSON.parse(window.localStorage.getItem(i)));
        		arr.push(JSON.parse(window.localStorage.getItem(i)));
        	}
        	
        	$scope.items=arr;
        	

		}
    }])