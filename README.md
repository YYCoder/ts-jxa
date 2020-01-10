[English](./docs/en.md) | [中文](./docs/cn.md)

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

### Other JXA resources
* [The JXA Cookbook](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki#table-of-contents)

* [Mac Automation Scripting Guide](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/index.html#//apple_ref/doc/uid/TP40016239-CH56-SW1)

* [A Beginners Guide to JXA, JavaScript Application Scripting](https://computers.tutsplus.com/tutorials/a-beginners-guide-to-javascript-application-scripting-jxa--cms-27171)

* [Javascript for Automation Documentation](https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-11.html#//apple_ref/doc/uid/TP40014508-CH110-SW1)