# ts-jxa
Write JXA using typescript 🚀! 

Freely use ES features which typescript supports and provide nice basic development experience.

> Thanks to [JXA-Cookbook](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki/Importing-Scripts).

### What is JXA?
It's OS X automation, using Javascript.

Since OS X 10.10 (Yosemite), Javascript (called Javascript for Automation, or JXA) is also supported for app automation. This is great news, especially for Javascript developers who want to automate workflows on their Mac.

But by default, JXA only provides some primitive functionalities for development. For example, if you what to modularizing your code, the only way is [Using Script Library](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/UseScriptLibraries.html#//apple_ref/doc/uid/TP40016239-CH36-SW1) which is apple officially recommended but it's cumbersome. And, you can't use any of your favorite node modules like lodash.

So, ts-jxa was born, aiming to make building JXA application more efficient and elegant.

### What is ts-jxa?
ts-jxa is a development tool for building JXA program.

It let you use a lot of typescript features like arrow function/const && let/promise and most importantly, static type check.

And it gives you a nice development experience by auto rebuild, elegant output, and compression for production.

### Installation
`yarn add ts-jxa` or `npm i ts-jxa`

If you want to install it globally, you can add global flag as follows:

`yarn global add ts-jxa` or `npm i -g ts-jxa`

### Usage
ts-jxa provide two ways to use which are CLI and Programming Interface.

Each usage uses the same options, but has slight differences which I will highlight in the following sections.

##### API
* **file(required)**: path to your entry typescript file

* **options(optional)**:
  * **-r|--run**: run bundled JXA file after each bundling process
  
  * **-w|--watch**: watch typescript files for changes
  
  * **-c|--compress**: compress bundled JXA file
  
  * **-o|--output <path>**: output bundled JXA file to specified folder

  * **--dev**: a shorthand for options `-rw --no-disk`, default is false
  
  * **--no-disk**: not write bundled JXA file to disk

    > **Note** that this option is different between CLI and Programming interface, the former is **--no-disk** which default value is false, and the latter is **disk** which default value is true.
  
  * **--prod**: an alias for options `-c`

    > Currently, it might not a necessary option, but since it has `--dev`, it might be more intuitive for beginners to have a comparative options. Further more, there may be more features in production mode in the future.

  * **-h|--help**: show help message

##### CLI
If you installed it global, you can use it by command **ts-jxa**. Following are some examples:

* **default usage**: `ts-jxa path-to-tsfile`, will generate a bundled **.scpt** file at current working directory

* **auto run**: `ts-jxa -r path-to-tsfile`, will generate a **.scpt** file at current working directory and run it

* **watch for modification**: `ts-jxa -w path-to-tsfile`, will automatically rebuild when file changes

* **specify output folder**: `ts-jxa path-to-tsfile -o path-to-output_folder`

* **compose of options**: `ts-jxa -rw path-to-tsfile`, will watch for modification and run it after each bundling process

* **dev mode**: `ts-jxa --dev path-to-tsfile`, which is a shortcut for `ts-jxa -rw --no-disk path-to-tsfile`

##### Programming Interface
You can also import ts-jxa using `import`(ES module) or `require`(commonjs).

The default export is a function, like following:

```typescript
import TsJXA from 'ts-jxa';

TsJXA(entryFilePath, { opts... });
```

First argument is the path to the entry file, which I demonstrated in the **API** section.

Second argument is an object with the corresponding properties in the **API** sction's **options** part.

Following is some examples:

Auto run bundled JXA file:

```typescript
import TsJXA from 'ts-jxa';

TsJXA(entryFilePath, {
    run: true
});
```

You can also compose multiple options:

```typescript
import TsJXA from 'ts-jxa';

TsJXA(entryFilePath, {
    watch: true,
    run: true,
    disk: false
});
```

### How is ts-jxa working?
Under the hood, ts-jxa uses [browserify](http://browserify.org/) to bundle and compile typescript code to a single `.scpt` file.

> Thanks to [JXA-Cookbook's tip](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki/Importing-Scripts#commonjs--browserify) again.

The CLI uses [commander](https://github.com/tj/commander.js/blob/master/Readme.md) to parse command line arguments.

If anybody wants to contribute, feel free to open a pull request😁.

There are sparse documentation about JXA and applescript. So, hope ts-jxa can make a difference in promoting JXA popularization.

### Other JXA resources
* [The JXA Cookbook](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki#table-of-contents)

* [Mac Automation Scripting Guide](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/index.html#//apple_ref/doc/uid/TP40016239-CH56-SW1)

* [A Beginners Guide to JXA, JavaScript Application Scripting](https://computers.tutsplus.com/tutorials/a-beginners-guide-to-javascript-application-scripting-jxa--cms-27171)

* [Javascript for Automation Documentation](https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-11.html#//apple_ref/doc/uid/TP40014508-CH110-SW1)




