第九到十一天：来做一个漂亮的网站
==============================
* [demo](https://wkstudy.github.io/2018ife/7/index.html)
## 知识点
>> ps 切图：要确定某个元素到周围元素的距离时，按住ctrl，鼠标移动这个元素上，就显示出来了
##  问题
>> 设置float=right 后元素，里面如果使用了块级元素，那么块级元素会出来，不知道为什么，只好使用行内元素
>> 这里面的行内元素的行高太小，但改变失败
```
<p class="right_info">
	<span>Learn How to Improve Your Personal Business</span>
	<br>
	<span>
	Li Jun, a China Academy of Engineering academician and also director of the alliance's experts' committee,said that China will also launch design guidance for smart cars,smart map architecture and standards for test grounds.
	</span>
</p>
```
>> our awesome crew 模块人物hover的效果不错，但是在position 定位时，已经设置了box-sizing: border-box;但定位结果还是有偏差：
```
#picfour .p2 {
	position: absolute;
	top: 30px;
	right: 1px;
}
#picfour .p4 {
	position: absolute;
	top: 400px;
	right: 1px;
}
```
>> 将contacts中的两个div设置为inline-block，并且布局正确，但只要在第一个里面加任何元素，这个div位置都会改变，最好只好重新定位了一下这个元素
>>> contacts 后续写第二个div时候，位置再次出现错误，放弃两个inline-block布局，改用position