define(['angular', './services', 'modal'], function(angular) {

	// http://docs.angularjs.org/guide/directive
	// http://www.ng-newsletter.com/posts/directives.html
	// 写自己的指令
	// 理论上来说 在angular的app中
	// 尽量少的去操作DOM
	// 要去操作怎么办 在指令中去完成
	var homeDirectives = angular.module('homeDirectives', ['homeServices', 'ui.bootstrap.modal']);

	return homeDirectives;

});
