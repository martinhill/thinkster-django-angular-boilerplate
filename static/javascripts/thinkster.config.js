(function () {
	'use strict';

	angular
		.module('thinkster.config')
		.config(config)

	config.$inject = ['$locationProvider'];

	console.log('hello from thinkster.config')

	function config($locationProvider) {
		console.log('hello from thinkster.config.config')
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}
})();