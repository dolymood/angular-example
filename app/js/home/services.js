define(['angular'], function(angular) {

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
	var homeServices = angular.module('homeServices', []);

	return homeServices;

});



