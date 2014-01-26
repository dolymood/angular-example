// 
// 这里改成了依赖指令模块
// homeDirectives
// 
// 指令-》 使得普通的HTML元素 具备更加强大的功能
// 		可以干什么事情
// 在咱们的这个示例中呢 就是给编辑操作一个指令rowEdit
// 一般的咱们的修改都比较复杂
// 需要弹窗修改的
//
var homeControllers = angular.module('homeControllers', ['homeServers' ,'homeDirectives']);

homeControllers

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

.controller('index1Ctl', function() {
	// todo...
})

.controller('index2Ctl', function() {
	// todo...
});