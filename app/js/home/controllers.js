define(['angular', './directives'], function(angular) {

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
	var homeControllers = angular.module('homeControllers', ['homeServices' ,'homeDirectives']);

	return homeControllers;

});