define(['angular', 'home/controllers', 'home/directives/directives'], function(angular, homeControllers) {

	return homeControllers

	.controller('indexDetailCtl', [
		'$scope',
		'$route',
		'listModel',
		function($scope, $route, listModel) {

			listModel.getDetail($route.current.params.itemId, function(item) {
				$scope.item = item;
			});

		}
	])

});