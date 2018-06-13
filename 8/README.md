第十二到十五天：来做一个漂亮的网站
==============================
* [demo](https://wkstudy.github.io/2018ife/8/index.html)
## 知识点
>> 实现高度自适应，直接设置该元素height:100%；是不行的，因为任何元素百分比都是相对于其父元素的，而一般body的默认height：auto，所以要：
```
html,
body {
	width:100%;
	height:100%;
}
<!-- 目标section -->
section {
	height:100%;
}
```
>> 调整对齐时，可以先将inline元素调整为inline-block元素，设置margin、padding。
## 问题
>> 一行内的文本和图片不是居中对齐，而是底部对齐？
>> 右上角的居中对齐有点难调，在对齐这方面了解的太少，inline、inline-block,block 元素有所区别，inline元素无法使用margin、padding，只能先调整为inine-block再进行调整。