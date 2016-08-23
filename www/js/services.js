angular.module('app.services', [])

.factory('userFactory', [function(){
	userFactory = {};
	userFactory.uid = null ;
	userFactory.event = null ;
	userFactory.email = null ;
	userFactory.category = null ;
	userFactory.returnAddress = null ;
	userFactory.test = 1 ;
	return userFactory;

}])

.service('BlankService', [function(){

}]);

