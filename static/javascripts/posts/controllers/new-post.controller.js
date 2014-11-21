(function () {
	'use strict';

	angular
		.module('thinkster.posts.controllers')
		.controller('NewPostController', NewPostController);

	NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Posts'];

	function NewPostController ($rootScope, $scope, Authentication, Posts) {
		var vm = this;

		vm.submit = submit;

		console.log('hello from thinkster.posts.controllers.NewPostController');

		function submit () {
			console.log('hello from NewPostController.submit');
			
			$rootScope.$broadcast('post.created', {
				content: vm.content,
				author: {
					username:  Authentication.getAutenticatedUser().username
				}
			});

			$scope.closeThisDialog();

			Posts.create(vm.content).then(createPostSuccessFn, createPostErrorFn);

			function createPostSuccessFn (data, status, headers, config) {
				console.log('Success! Post created.');
			}

			function createPostErrorFn (data, status, headers, config) {
				$rootScope.$broadcast('post.created.error');
				console.log(data.error);
			}
		}
	}
})();