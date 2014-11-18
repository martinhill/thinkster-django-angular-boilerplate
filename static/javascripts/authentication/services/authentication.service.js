/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
	'use strict';

	angular
		.module('thinkster.authentication.services')
		.factory('Authentication', Authentication);

	Authentication.$inject = ['$cookies', '$http'];

	console.log('hello from thinkster.authentication.services');
	/*
	* @namespace Authentication
	* @returns {Factory}
	*/
	function Authentication($cookies, $http) {
		var Authentication = {
			register: register
		};

		return Authentication;

		function register(username, password, email) {
			return $http.post('/api/v1/users/', {
				username: username,
				password: password,
				email: email
			});
		}
	}
})();