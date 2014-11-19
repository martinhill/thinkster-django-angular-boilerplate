(function () {
	'use strict';

	angular
		.module('thinkster', [
			'thinkster.config',
			'thinkster.routes', 
			'thinkster.authentication',
			'thinkster.layout'
		]);

	angular
		.module('thinkster.config', []);
	angular
		.module('thinkster.routes', ['ngRoute']);

	angular.module('thinkster').run(run);

	run.$inject = ['$http'];

	console.log('hello from thinkster');

	function run($http) {
		console.log('hello from thinkster.run');
		$http.defaults.xsrfHeaderName = 'X-CSRFToken';
		$http.defaults.xsrfCookieName = 'csrftoken';
	}
})();