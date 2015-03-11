require.config({
	baseUrl: '../js',
	paths: {
		angular: '../lib/angular-1.2.7/angular',
		angularRoute: '../lib/angular-1.2.7/angular-route',
		angularAnimate: '../lib/angular-1.2.7/angular-animate',
		transition: '../lib/transition',
		modal: '../lib/modal'
	},
	shim: {
		angular: {
			exports: 'angular'
		},

		angularRoute: {
			exports: 'angular',
			deps: ['angular']
		},

		angularAnimate: {
			exports: 'angular',
			deps: ['angular']
		},

		transition: {
			exports: 'angular',
			deps: ['angular']
		},

		modal: {
			exports: 'angular',
			deps: ['angular', 'transition']
		},
	}
});

require(['angular', 'angularRoute', 'angularAnimate', 'home/controllers/appCtl'], function(angular) {

	var app = angular.module('app', ['ngRoute', 'ngAnimate', 'homeControllers']);

	// http://docs.angularjs.org/api/angular.Module
	// http://docs.angularjs.org/guide/module
	// module的 config方法 用于在app Module跑起来之前对咱们的app
	// 做一些详细的设置
	// 
	// 可以看到在config的时候也是支持依赖注入的
	// 但是并不是所有的东西在此时都是可以被注入的
	// 只有 providers 和 constants可以被注入 暂时记住就OK
	app
	.config([
		'$routeProvider',
		'$locationProvider',
		function($routeProvider, $locationProvider) {

			// 详见 http://docs.angularjs.org/guide/dev_guide.services.$location
			// 设置下 location以何种方式改变
			// 如果是以HTML5的新的history模式的话 
			// 设置html5Mode(true)即可 针对于IE8 9 不支持这种方式
			// 但是我们不用担心 angualr已经帮助我们做好了兼容
			//
			// 如果当是以hash的方式更新location的话 需要设置下hashPrefix
			// 就是以什么样的前缀 展现 默认不设置的话 是空的''
			$locationProvider.html5Mode(true).hashPrefix('!');

			// http://docs.angularjs.org/api/ngRoute.$routeProvider
			// 配置下route路由 很好理解
			// route需要配合 ng-view 指令才能正常工作
			// 在html 可以看到咱们在bdy的元素的子元素div上指定了
			// ng-view指令
			// 默认当匹配到指定路由的时候
			// 就会把路由对应的模板内容插入到ng-view指令所在的
			// 元素里
			$routeProvider
			.when('/', {
				templateUrl: '../partials/index.html',
				controller: 'indexCtl'
			})
			.when('/index1', {
				templateUrl: '../partials/index1.html',
				controller: 'index1Ctl'
			})
			.when('/index2', {
				templateUrl: '../partials/index2.html',
				controller: 'index2Ctl'
			})
			.when('/:itemId', {
				templateUrl: '../partials/indexDetail.html',
				controller: 'indexDetailCtl'
			})
			.otherwise({
				redirectTo: '/'
			});

		}
	])

	// 另外一个长用的方法就是run方法了，显而易见 就是
	// module已经完成了依赖注入等操作 在启动的过程中运行的
	// 同样的只有支持依赖注入 但是
	// 只有 instances(实例) 和 constants(常量) 可以被注入
	.run([
		// http://docs.angularjs.org/api/ng.$rootScope
		// 每一个app都会对应着一个唯一的rootScope
		'$rootScope',
		// http://docs.angularjs.org/api/ng.$location
		// angular已经封装好的location 提供了很多
		// 便捷的方法 还有 当locationchange的时候有事件
		'$location',
		function($rootScope, $location) {

			var parsePath = function(path) {
				$rootScope.subPath = path;
				path = path.replace(/^(\/\w+?)(\/\w*)?$/, '$1');
				if (path.match(/^\/\d+$/)) {
					return '/';
				}
				return path;
			};

			$rootScope.path = parsePath($location.path());

			$rootScope.$on('$routeChangeSuccess', function(newVal) {
				$rootScope.path = parsePath($location.path());
			});

		}
	]);

	// 启动
	angular.element().ready(function(){
		angular.bootstrap(document, [app.name]);
	});

});
