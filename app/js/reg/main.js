require.config({
	baseUrl: 'js',
	paths: {
		angular: '../lib/angular-1.2.7/angular',
		angularRoute: '../lib/angular-1.2.7/angular-route'
	},
	shim: {
		angular: {
			exports: 'angular'
		}
	}
});

require(['angular'], function() {

	// 声明一个名为app的module，
	// 第一个参数module名，第二个参数['MM'...]数组，依赖其他的module名组成的数组
	// 如果没有任何其他的依赖module的话，也需要传一个[]的进去，
	// 如果第二个参数没有的话 angular会默认认为去取得module的实例
	var app = angular.module('app', []);

	// 去创建一个名为regCtrl的controller，
	// 第二个参数是一个函数，当然函数是需要参数的。
	// 
	// 注意的是，controller中的参数是通过angular的依赖注入机制依赖注入的
	// 依赖注入的方式有3种：
	// 1：function(a, b...) {} 这样的，原理就是angular通过把函数toString，
	// 		匹配到函数中的参数，然后注入的；这样有个问题，在项目上线的时候怎么办
	// 		一般咱们都会压缩混淆代码，变量名会被替换掉，所以这种方式在实际应用中
	// 		很少会用 除非你不回去压缩混淆
	// 2：['a', 'b', function(a, b) {}] 这种方式是一个数组，前面所有参数都是
	// 		依赖项，最后一个是真正的函数，所以这里在函数的参数中，并不一定是a ,b了
	// 		任意名字即可了，所以不存在压缩混淆的问题
	// 3：fun = function(a, b) {};fun.$inject = ['a', 'b']; 也是可以的
	// 
	// 这引出另一个问题，什么东西是可以被注入进去的，并不是所有的东西都可以被注入进去的
	// 注入的基础是provider，Constant Value Service Factory Provider嗾使可以的
	// http://docs.angularjs.org/guide/providers 最后的总结部分
	// http://iffycan.blogspot.com.ar/2013/05/angular-service-or-factory.html
	// http://iffycan.blogspot.com.ar/2013/07/angular-injection.html
	// 
	// ps: 个人比较偏好方式2，所以在代码中，就是这样写的。。
	// 
	// 在controller中，所有的操作都是针对于scope修改的
	// angular是基于数据驱动的框架，所以说，在咱们的controller中
	// 只需要去操作数据即可 也就是更改咱们的scope 
	app.controller('regCtrl', ['$scope', '$timeout', function($scope, $timeout) {
		$scope.username = 'aaaaaa';
		$scope.password = 'password';
		$scope.submit = function() {
			if ($scope.checkErr) return;
			var data = {
				username: $scope.username,
				password: $scope.password
			};

			$scope.pending = true;
			$timeout(function() {
				$scope.pending = false;
				// 成功 跳转
				location.href='home/';
			}, 300)
		};
	}]);

	// 启动
	angular.element().ready(function(){
		angular.bootstrap(document, [app.name]);
	});

});
