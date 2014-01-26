define(['angular', 'home/directives', 'home/services/services'], function(angular, homeDirectives) {

	return homeDirectives

	// 先来一个标准的指令的写法 example

	.directive('directiveExample', function() {

		return {
			restrict: 'A', // 使用方式 E A C M 
										 // 分别对应
										 // 标签名：<directive-example></directive-example>
										 // 属性名：<div directive-example></div>
										 // class中的cls：<div class="directive-example"></div>
										 // 写在注释中：<!-- directive: directive-example -->
										 // 
										 // 
			
			replace: true, // 是否替换 true false 默认false
			
			transclude: true, // ransclude主要完成以下工作，取出自定义指令中的内容(就是写在指令里面的子元素)，以正确的scope作用域解析它,然后再放回指令模板中标记的位置(通常是ng-transclude标记的地方)
			
			priority: 1,// 设置指令的执行顺序，数字，相对于其他指令而言的，例如ng-repeat默认1000 如果不设置，默认是0
			
			template: '<div ng-transclude>dgfdsf</div>', // 需要的模板 当是一个简单的模板的时候可以直接写在template中即可
			
			templateUrl: '/d/a.html', // 需要的模板 当一个模板复杂的使用 建议使用 
			
			scope: true, // true => 创建新的scope 继承自已存在的scope
				// false 不创建 使用 当前已存在的scope
				// object 独立scope {aa: '='} 
					// @ 字符串属性值 = 绑定当前属性值  & 作为函数使用
				// 有了例子就好明白多了...
			
			controller: function() { // 写控制器 可以依赖注入

			},
			
			require: '^tabSet',// 其他指令
			// ^ 必须（当不能找到的时候就会报错了） ? 非必须（找不到也不会报错）
			
			// link 当compile编译完成后 会被调用
			link: function(scope, ele, attrs, controller) { // 非依赖注入
				
			},
			
			// http://docs.angularjs.org/guide/compiler
			// 编译函数 参数中没有scope 因为此时scope还不存在
			// 只是针对于DOM模板ele的操作 
			// 
			// 注意当出现compile的时候 link无用了
			// 也就是说compile和link是不会同时出现的
			compile: function(ele, attrs, transclude) {

				return {
					// 在compile之后 但是还未调用link之前
					pre: function(scope, ele, attrs, controller) {},
					// 相当于是link函数
					post: function(scope, ele, attrs, controller) {}
				}
			}
		}

	})

	// 咱们需要的 rowEdit 指令
	// 
	// 咱们这里依赖了angular-ui的modal模态窗组件 $modal
	// http://angular-ui.github.io/bootstrap/
	.directive('rowEdit', [
		'listModel',
		'$modal',
		function(listModel, $modal) {

			return {

				restrict: 'A',
				scope: { // 独立scope
					data: '=editData' // 这里用的是= 意味着新创新的独立scope
														// newScope.data = 已存在的scope的item属性值
														// 为什么是item呢 因为在标签设置了
														// edit-data="item"
														// 
														// 如果说在标签上写的是data="item"
														// 那么这个地方直接可以用 data:'='
														// 
														// 其他的 如果使用 @ 的话 就是取得属性对应的值
														// 如果是 & 的话 就是以函数的形式调用
														// 
														// eg:
														// 
														// outerScope
														// 
														// outerScope.outerCallFn = function outerCallFn() {};
														// 
														// 使用方式：
														// <div 指令名 attr="attrs..." callFn="outerCallFn()"></div>
														// 
														// 
														// scope: {
														// 		attr: '@',
														// 		callFn: '&'
														// }
														// 
														// 那么在新的独立scope newScope取到的值就是
														// 
														// attr => 'attrs...',
														// callFn => outerCallFn
				},
				controller: ['$scope', function($scope) {

					this.handlerClick = function(e) {
						e.stopPropagation();
						
						$modal.open({
							templateUrl: '../partials/edit.html',
							resolve: {
								data: function() {
									return $scope.data
								}
							},
							controller: [
								'$scope',
								'$modalInstance',
								'data',
								function($scope, $modalInstance, data) {

									var oData = angular.copy(data);

									$scope.data = data;

									$scope.ok = function() {
										$scope.pending = true;
										listModel.updateItem($scope.data, function() {
											$scope.pending = false;
											$modalInstance.close();
										});
									};

									$scope.cancel = function() {
										data.name = oData.name;
										data.grp = oData.grp;
										$modalInstance.dismiss();
									};
								}
							]
						});
					};

				}],
				link: function($scope, ele, attrs, controller) {
					// 监听click事件
					ele.on('click', controller.handlerClick);
				}
			}

		}
	])

});




