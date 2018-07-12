第三十四天到第三十六天：我是精明的小卖家（二）
==============================
[demo](https://wkstudy.github.io/2018ife/34/smartSailer/index.html)

## 说明
* practice 中是本节练习的所有文件，smartSailer是和上一节整合的。
* 用svg写柱状图部分用canvas代替了。以后有机会再用svg吧。
* 没有做绘制多条柱状图的部分，这部分浪费太多时间了。

## 知识点
* xml 是用来存储和传输数据的，而html是用来展示数据的。我感觉类似是json一种数据格式，但肯定比json强大的多，
* xhtml 是xml+html---->演化而来
* DTD  通过DTD验证的xml才是合法的xml，可以理解为xml需要遵守的规则。
* Schema (XSD) 也是基于xml的DTD的替代者，用来描述xml文档的结构，比DTD更加强大。
* SVG  使用xml格式定义图形，是纯粹的xml
>> svg和它的竞争技术比如说HTML Canvas和Adobe Flash，都已经实现了成熟的应用接口。但是SVG也有自身的优点，比如它实现了DOM接口（比Canvas方便），不需要安装第三方插件就可以在浏览器中使用（比Flash方便）。当然，是否使用SVG还要取决于你要实现什么。
>>> 关于贝瑟尔曲线指令，还是张鑫旭大神讲的清楚。
>>> [深度掌握SVG路径path的贝塞尔曲线指令](http://www.zhangxinxu.com/wordpress/?p=4197)
>>> [贝塞尔曲线与CSS3动画、SVG和canvas的基情](http://www.zhangxinxu.com/wordpress/?p=3626)
>>> js操作svg[JS操作SVG的一些知识](https://blog.csdn.net/jiangdragon/article/details/50043459)
* 使用dom.style.width、dom.getAttribute('width')获取不到或者获取的结果是错的，可以尝试document.defaultView.getComputedStyle(dom,null).width
>> ```
>> document.defaultView.getComputedStyle(document.getElementById('bar'),null).width
>> ```
* canvas元素大概必须设置宽高，在css中设置了还要在重新设置一下。必须有这样的形式。
>> ```
   <canvas id="bar" width="1000" height="800"></canvas>
>>```
* canvas 每次获取宽高时，都会将画布清空，重新画画
* 鼠标已开表格需要重新设置画出所有折线，绑定mouseout不会触发，绑定mouseleave才会触发（mouseout是到另一个元素触发（另一个元素可以位于他的外部，也可以是内部，而mouseleave是到这个元素外部，到这个元素内部不会触发，且mouseleave不冒泡  p368 JavaScript高级程序设计））


## 犯过的错
* 由于用js获得svg出错，决定使用svg的部分全部使用canvas代替
* 用canvas绘制的圆中间一直都有线，发现绘制圆时，起始点必须在最右边，否则就会有线
>>> ```
>>>		context.moveTo(200,500);
>>> 	context.arc(100,500,100,0,2 * Math.PI,false);
>>> ```
*  经常容易这样：获取到元素之后直接与值比较，没有取得元素的值
```
if(e.target.parentNode.childNodes[0] == sourceData[i].product)
if(e.target.parentNode.childNodes[0].innerText == sourceData[i].product)
```
* barCanvas.js和lineByCanvas.js中获取宽度和高度是string类型，使用Number()进行转换发现不能成功，只能使用parseInt()
* 虽然在base.css中为两个canvas设置了宽高，但结果显示不出来，试了半年，发现原来必须在canvas元素中有width,height，于是在获取了宽高后又设置了一次
>> ```
	//lineByCanvas.js中
	drawing.width = w;
	drawing.height = h;
	//barCanvas.js中
	drawing.width = width;
	drawing.height = height;
>>```
* table事件代理mouseover， tr没有触发事件，不知道为什么,最后没有使用事件代理，直接循环tr绑定。
* canvas 每次获取宽高时，都会将画布清空，重新画画
