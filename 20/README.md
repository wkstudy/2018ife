第二十到二十一天：和页面对话
==============================
## 知识点
* 键盘事件 keydown 、keypress、keyup、textInput事件的区别  p379 JavaScript高级程序设计
* setTimeout() setInterval();在停止循环执行setInterval时，需考虑全局变量，局部变量
* 移除disabled属性使用的removeAttribute();对属性、特性的理解在 js高级程序设计p264、p276
* css sprite技术

## 易错点
* 设置background-position属性失败，代码如下；
```
document.getElementById('sprite').style.backgroundPositionY = 960;
console.log(document.getElementById('sprite').style.backgroundPositionY)
-7680px
```
原因在于这其实是一个像素值，单纯的设为数字是不起作用的，修改后结果如下：
```
document.getElementById('sprite').style.backgroundPositionY = '960px';
console.log(document.getElementById('sprite').style.backgroundPositionY)
960px
```
此类问题可能会经常出现，已经修改了值但一直不生效，结果可能就是因为没有单位。
* document.getElementById('fade-obj').style.opacity获取的值为字符串类型，直接进行加法是在连接字符串，需要Number（）一下,但是使用parseInt()转化的结果就不对，不知道为什么。