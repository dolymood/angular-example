define(['angular', 'home/services'], function(angular, homeServices) {

	homeServices

	// 创建一个factory 的service
	// 每一个service就只会有一个实例
	// 
	// 另外一种是 .service(name, constructor)
	// 这种方式创建
	// 区别：http://iffycan.blogspot.com.ar/2013/05/angular-service-or-factory.html
	.factory('listModel', [
		'$http',
		'$timeout',
		function($http, $timeout) {
			
			var allItems, defer;

			return {

				getItems: function() {
					if (allItems) return allItems;
					if (!defer) {
						defer = $http.get('../data/index.json');
						defer.success(function(res) {
							allItems = res;
							defer = null;
						});
					}
					
					return defer;
				},

				getDetail: function(id, callback) {
					// 应该是去请求详情的 这里就直接从allItems中取了
					var isDone = false, that = this;
					if (allItems) {
						angular.forEach(allItems, function(item) {
							if (!isDone && item.id == id) {
								callback(item);
								isDone = true;
							}
						});
					} else {
						this.getItems().success(function() {
							$timeout(function() {
								that.getDetail(id, callback);
							}, 0);
						});
					}
				},

				delItem: function(item, callback) {
					// 模拟请求del
					$timeout(function() {
						// 根据成功 或者 失败 掉回调
						var res = {

						};

						callback(res);
					}, 350);
				},

				updateItem: function(nItem, callback) {
					// nItem
					// 模拟请求 
					$timeout(function() {
						// 根据成功 或者 失败 掉回调
						var res = {

						};

						callback(res);
					}, 350);
				},

				addItem: function(item, callback) {
					// 模拟请求add
					$timeout(function() {
						// 根据成功 或者 失败 掉回调
						var res = {

						};

						callback(res);
					}, 350);
				}

			}

		}
	])

});