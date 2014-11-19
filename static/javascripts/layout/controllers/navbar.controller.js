(function () {
	'use strict';

	angular
		.module('thinkster.layout.controllers')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$scope', 'Authentication'];

	console.log('hello from thinkster.layout.controllers');

	function NavbarController($scope, Authentication) {
		var vm = this;

		vm.logout = logout;

		console.log('hello from thinkster.layout.controllers.NavbarController');

		function logout() {
			console.log('hello from thinkster.layout.controllers.logout');
			Authentication.logout();
		}
	}
})();