第二十八天到第三十天 给爱的人发个邮件吧
==============================
[demo](https://wkstudy.github.io/2018ife/28/index.html)

## 知识点
* 监听输入框值变化的选择[keydown、keypress、keyup、input](https://www.cnblogs.com/lhb25/archive/2012/11/30/oninput-and-onpropertychange-event-for-input.html)
>> 这四类事件的区别 p379 JavaScript高级程序设计
>>如果使用 onkeydown、onkeypress、onkeyup 这个几个键盘事件来监测的话，监听不了右键的复制、剪贴和粘贴这些操作，处理组合快捷键也很麻烦。因此选择结合 HTML5 标准事件 oninput 和 IE 专属事件 onpropertychange 事件来监听输入框值变化。
* 算是目前第一次按照流程一步一步完成任务
* 按照流程每一步都封装了函数，比较标准，可以供以后借鉴
* [Web安全之XSS攻防](https://blog.csdn.net/ganyingxie123456/article/details/70230486)
* js实现对HTML的字符转义和反转义,对这里的理解还不够[javascript对HTML字符转义与反转义](https://www.cnblogs.com/GumpYan/p/7883133.html)
>> 使用这个转义、反转义方法，用浏览器内部转换器实现html解码方法可以使用，但用正则表达式实现的有错误。
*  ```
	document.getElementById('email-input').focus();//获取焦点事件
	document.getElementById('email-input').select()//选中事件
	```