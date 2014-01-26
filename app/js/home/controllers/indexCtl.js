define(['angular', 'home/controllers', 'home/directives/directives'], function(angular, homeControllers) {

	return homeControllers

	.controller('indexCtl', [
		'$scope',
		'$timeout',
		'listModel',
		function($scope, $timeout, listModel) {
			
			var items = listModel.getItems();
			// 保证同一份items
			if (items.success) {
				items.success(function() {
					$timeout(function() {
						$scope.items = listModel.getItems();
					});
				});
			} else {
				$scope.items = items;
			}
			

			var id = 11;
			$scope.addNewItem = function() {
				if (!$scope.newItem) return;

				var re = {
					id: id++,
					name: $scope.newItem,
					grp: 'new grp...'
				};
				
				listModel.addItem(re, function(res) {
					// 默认成功
					$scope.items.push(re);
					$scope.newItem = '';
				});

			};

			$scope.delItem = function(item) {
				var scope = this;
				scope.pending = true;
				listModel.delItem(item, function(res) {
					// 默认成功
					scope.pending = false;
					$scope.items.splice($scope.items.indexOf(item), 1);
				});
			};

		}
	])

});