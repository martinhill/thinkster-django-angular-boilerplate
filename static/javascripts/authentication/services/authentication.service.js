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
			register: register,
			login: login,
			getAuthenticatedUser: getAuthenticatedUser,
			isAuthenticated : isAuthenticated,
			setAuthenticatedUser : setAuthenticatedUser,
			unauthenticate: unauthenticate
		};

		return Authentication;

		function register(username, password, email) {
			return $http.post('/api/v1/users/', {
				username: username,
				password: password,
				email: email
			}).then(registerSuccessFn, registerErrorFn);

			function registerSuccessFn(data, status, headers, config) {
				Authentication.login(username, password);
			}

			function registerErrorFn(data, status, headers, config) {
				console.error('Epic fail!');
			}
		}
		
		function login(username, password) {
			return $http.post('/api/v1/auth/login/', {
				username: username, password:password
			}).then(loginSuccessFn, loginErrorFn);

			function loginSuccessFn(data, status, headers, config) {
				Authentication.setAuthenticatedUser(data.data);

				window.location = '/';
			}

			function loginErrorFn(data, status, headers, config) {
				console.error('Epic fail!');
			}
		}

		function getAuthenticatedUser() {
			if (!$cookies.authenticatedUser) {
				return;
			}
			return JSON.parse($cookies.authenticatedUser);
		}

		function isAuthenticated() {
			return !!$cookies.authenticatedUser;
		}

		function setAuthenticatedUser(user) {
			$cookies.authenticatedUser = JSON.stringify(user);
		}

		function unauthenticate() {
			delete $cookies.authenticatedUser;
		}
	}
})();