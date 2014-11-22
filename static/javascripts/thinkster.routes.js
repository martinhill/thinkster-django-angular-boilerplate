(function () {
	'use strict';

	angular
		.module('thinkster.routes')
		.config(config);

	config.$inject = ['$routeProvider'];

	console.log('hello from thinkster.routes');

	function config($routeProvider) {
		console.log('hello from thinkster.routes.config');
		$routeProvider.when('/register', {
			controller: 'RegisterController',
			controllerAs: 'vm',
			templateUrl: '/static/templates/authentication/register.html'
		}).otherwise('/');
	}
})();