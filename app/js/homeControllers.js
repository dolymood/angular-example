// 在很多时候 咱们的数据是需要统一去管理的
// 有可能这份数据不仅仅是在这个controller中
// 去使用，尤其是在数据处理比较复杂的情况下
// 
// 如果多个controller都去用service去统一管理数据的话
// 代码量会减很少 相应的bug也会越少
// 维护就更加方便
// controller仅仅只需要关注于 控制
var homeControllers = angular.module('homeControllers', ['homeServers']);

homeControllers

.controller('indexCtl', [
	'$scope',
	'$http',
	'listModel',
	function($scope, $http, listModel) {
		
		listModel.getItems().success(function(res) {
			$scope.items = res;
		});

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

.controller('index1Ctl', function() {
	// todo...
})

.controller('index2Ctl', function() {
	// todo...
});