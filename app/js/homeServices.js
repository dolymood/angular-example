// 创建一个module 
// 主要作用是管理home中用到的service
// 
// http://docs.angularjs.org/guide/dev_guide.services.understanding_services
// 
// 如果说你的项目 后端支持REST API的话
// 那就更爽了 angular中有 resource 服务
// 用它就可以轻易的创建RESTful的数据源
// 这里不再示例 
// http://docs.angularjs.org/api/ngResource.$resource
// 参照 http://docs.angularjs.org/tutorial/step_11 即可
var homeServers = angular.module('homeServers', []);

homeServers

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