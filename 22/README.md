第二十二到二十四天：和JavaScript中的居民
==============================
## 知识点
* addEventListener('click',isNum,false);这里的函数应该是函数名，而不能加括号，加了括号代表自己执行了，在没点击之前就可以运行。
* toFixed(),制定小数位数
* js小数取整的函数
>> 1.丢弃小数部分,保留整数部分
>> js:parseInt(7/2)
>> 2.向上取整,有小数就整数部分加1
>> js: Math.ceil(7/2)
>> 3,四舍五入.
>> js: Math.round(7/2)
>> 4,向下取整
>> js: Math.floor(7/2) 
* 全角半角[参考网址](https://www.cnblogs.com/GeniusLyzh/p/7113581.html?utm_source=itdadao&utm_medium=referral)
* 什么是全角半角
>> 传统上，英语或拉丁字母语言使用的电脑系统，每一个字母或符号，都是使用一字节的空间（一字节由8比特组成，共256个编码空间）来储存；而汉语、日语及韩语文字，由于数量大大超过256个，故惯常使用两字节来储存一个字符。在使用等宽字体（如DOS、部分文字编辑器等）的环境下，中日韩文字此时占据两倍于西文字符的显示宽度。所以，中、日、韩等文字称为全角字符，相比起来，拉丁字母或数字就称为半角字符。有时为了使字体看起来齐整，英文字母、数字及其他符号也由原来只占一个字空间，改为占用两个字的空间显示、使用两个字节储存的格式.
* 转换原理
>> 全角空格unicode编码为12288，半角空格为32
>> 其他字符半角(33-126)与全角(65281-65374)的unicode编码对应关系是：均相差65248
* indexObject.html中设计二叉树的查找、遍历
* 队列、栈的基本操作
* js  arr.sort()方法
* 不同数据结构的转换，比如数组转换成对象，对象转换成数组
>> 对象转数组时候用的
>> ```
>> for(property in obj) {
>>  //主要是用来列举对象的属性，property是属性名，obj[property]是对应的值
>> }
>> ```
* 数组转为对象那个题没做出来，对于数组元素之间的关系有点理不清

## 犯的错
* indexFunction.html的两个函数编写的时候，对于for循环的条件考虑不周，导致出现bug.
* 两个函数刚开始都没有考虑到字符串为空的情况
* str.slice(start,end)返回的结果中没有str[end]这个值，要注意一下。