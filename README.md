angular-example
===============

Angular example，一步一步学习angular。

切换分支即可查看整个完成过程 ls_XXX。

_注：在过程完之后，关于这个demo的更多细节、完善会一直在`master`分支上增加，不会增加新的分支了。_

最后的`master`分支上的是最终版本，除去之前的每一步所在的，之后加的新的东西都只会在`master`分支上。

-----------------------------

## 主要涉及内容：

1. 最基础，首先应该如何跑起来一个应用。
2. 了解基本概念，可能涉及 `module`, `scope`, `controller`, `service`, `directive`, 表达式 等等。
3. `directive` 详细介绍怎么样使用，自定义指令时各项代表含义；一些常见内置指令，例如：`ng-model`, `ng-controller`, `ng-include`, `ng-hide`, `ng-show` 等等。实战自定义指令：编辑项指令。
4. ng 的路由的使用。
5. 第三方服务`$modal`的使用。
6. 目录结构、代码基本组织。
7. 和 `require.js` 结合使用。

> 中间过程中会基本实战一些最基础的一些概念，当然，最重要的还是改变思路；不以`jquery`式思路“干活”，一切以数据为中心，再加上模板上的逻辑（其实一般通过ng的指令——`ng-if`, `ng-show`, `ng-switch`等——来做）。

> 所以最开始的时候，最好不要 `jquery`，摒弃 `DOM` 操作，让`angular` 自身去更新`DOM`；其实也就是说：不要在代码中操作`DOM`，仅有的操作`DOM`的地方在指令`directive` 中。后期如果真的是项目需要，可以加上`jquery`。

##预览图
![reg](https://raw.github.com/dolymood/angular-example/master/mdImgs/reg.png)
![index](https://raw.github.com/dolymood/angular-example/master/mdImgs/index.png)
![index-edit](https://raw.github.com/dolymood/angular-example/master/mdImgs/index-edit.png)
![index-detail](https://raw.github.com/dolymood/angular-example/master/mdImgs/index-detail.png)
![index1](https://raw.github.com/dolymood/angular-example/master/mdImgs/index1.png)
![index2](https://raw.github.com/dolymood/angular-example/master/mdImgs/index2.png)
