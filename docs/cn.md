# ts-jxa
用 typescript 写 JXA 🚀! 

随意使用 typescript 支持的任何 ES 特性，并提供良好的基础开发体验。

> 感谢 [JXA-Cookbook](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki/Importing-Scripts).

### JXA 是什么？
即用 JavaScript 开发 OS X automation。

自 OS X 10.10（Yosemite）版本后，就支持通过 JavaScript 编写 app 自动化流程。这对 JS 开发者来说无疑是好消息，极大降低了我们开发自动化工作流程的门槛。

不过默认情况下，JXA 只提供了一些很原始的开发功能。举个例子，如果你想模块化你的代码，唯一的方式就是通过苹果官方的[方案](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/UseScriptLibraries.html#//apple_ref/doc/uid/TP40016239-CH36-SW1)，它需要你将代码保存到你的 Mac 中的某个目录中，并通过 `Library` 方法引入，很麻烦。并且，你无法使用任何你喜欢的库，比如 lodash。

基于如上原因，ts-jxa 诞生了。目标是让开发 JXA 应用更加高效、优雅。

### ts-jxa 是什么？
ts-jxa 是一个构建 JXA 应用的开发工具。

它让你随意使用 typescript 提供的语言特性，如箭头函数、const/promise 等等，以及最重要的静态类型检查。

并且，它能够给予你良好的开发体验，包括自动化重新构建、优雅的提示，以及生产环境的代码压缩。

### 安装
`yarn add ts-jxa` 或 `npm i ts-jxa`

如果你想要全局安装它，可以使用如下命令：

`yarn global add ts-jxa` 或 `npm i -g ts-jxa`

### 使用
ts-jxa 提供了两种方式使用，第一种是 CLI（即命令行工具），第二种是 编程接口（即在你的代码中使用它）。

每种用法都使用相同的选项，但又有些细微的差别，我会在下文中说明。

##### API
* **file(required)**: 入口文件的路径

* **options(optional)**:
  * **-r|--run**: 每次打包完成后自动执行打包后的 JXA 文件
  
  * **-w|--watch**: 监听文件修改，当发生变动后自动触发重新打包
  
  * **-c|--compress**: 压缩打包后的 JXA 文件
  
  * **-o|--output <path>**: 指定输出 JXA 文件的路径

  * **--dev**: `-rw --no-disk` 的简洁写法，提供了开发中所需的功能
  
  * **--no-disk**: 不输出文件到磁盘中

    > **注意**，这个选项在 CLI 和 编程接口中有些许不同，前者的参数名是 **--no-disk**，默认值是 false，后者的参数名是 **disk**，默认值是 true。
  
  * **--prod**: `-c` 的别名

    > 目前来说，这也许并不是一个不可或缺的选项，不过既然已经有了 `--dev`，有一个与之对应的 `--prod` 也更符合初学者的直觉。并且，以后有可能在生产模式添加更多功能。

  * **-h|--help**: 展示帮助信息

##### 命令行接口
如果你已经全局安装它，可以直接通过 `ts-jxa` 命令使用。如下是一些例子：

* **默认用法**: `ts-jxa path-to-tsfile`，会在当前工作目录生成一个打包后的 **.scpt** 文件

* **自动运行**: `ts-jxa -r path-to-tsfile`，会在当前工作目录自动生成一个 **.scpt** 文件并且自动运行它

* **监听修改**: `ts-jxa -w path-to-tsfile`，会在有依赖文件修改后自动重新构建

* **指定输出目录**: `ts-jxa path-to-tsfile -o path-to-output_folder`

* **组合多个选项**: `ts-jxa -rw path-to-tsfile`，会同时使用 `-r` 及 `-w` 的特性

* **开发模式**: `ts-jxa --dev path-to-tsfile`，`ts-jxa -rw --no-disk path-to-tsfile` 的别名，提供开发所需的功能

##### 编程接口
你也可以通过 `import`（ES module 语法）或 `require`（commonjs）导入 **ts-jxa**。

默认导出是一个函数，如下：

```typescript
import TsJXA from 'ts-jxa';

TsJXA(entryFilePath, { opts... });
```

第一个参数是入口文件路径，在前面 **API** 一节提到过。

第二个参数是选项，与前端 **API** 一节中 **options** 部分一一对应。

如下是一些使用示例：

打包后自动运行：

```typescript
import TsJXA from 'ts-jxa';

TsJXA(entryFilePath, {
    run: true
});
```

你也可以同时使用多个选项：

```typescript
import TsJXA from 'ts-jxa';

TsJXA(entryFilePath, {
    watch: true,
    run: true,
    disk: false
});
```

### 原理
ts-jxa 底层使用 [browserify](http://browserify.org/) 打包 typescript，并产出一个 `.scpt` 文件。

> 再次感谢 [JXA-Cookbook 的建议](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki/Importing-Scripts#commonjs--browserify)。

CLI 工具使用 [commander](https://github.com/tj/commander.js/blob/master/Readme.md) 解析命令行参数。

欢迎各路大牛参与共建，不要犹豫提出你的 pull request😁！

有关 JXA 及 applescript 的资料非常少，大部分也都是英文的，因此希望 ts-jxa 能够在推进 JXA 普及上做出一些贡献。

### 其他 JXA 相关资源
* [The JXA Cookbook](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki#table-of-contents)

* [Mac Automation Scripting Guide](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/index.html#//apple_ref/doc/uid/TP40016239-CH56-SW1)

* [A Beginners Guide to JXA, JavaScript Application Scripting](https://computers.tutsplus.com/tutorials/a-beginners-guide-to-javascript-application-scripting-jxa--cms-27171)

* [Javascript for Automation Documentation](https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-11.html#//apple_ref/doc/uid/TP40014508-CH110-SW1)




