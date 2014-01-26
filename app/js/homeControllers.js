var homeControllers = angular.module('homeControllers', []);

homeControllers

.controller('indexCtl', [
	'$scope',
	'$http',
	function($scope, $http) {
		
		$http.get('../data/index.json').success(function(res) {
			$scope.items = res;
		});

		var id = 11;
		$scope.addNewItem = function() {
			if (!$scope.newItem) return;
			$scope.items.push({
				id: id++,
				name: $scope.newItem,
				grp: 'new grp...'
			});
			$scope.newItem = '';
		};

		$scope.delItem = function(item) {
			$scope.items.splice($scope.items.indexOf(item), 1);
		};

	}
])

.controller('index1Ctl', function() {
	// todo...
})

.controller('index2Ctl', function() {
	// todo...
});