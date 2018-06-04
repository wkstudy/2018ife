## 注意
* practice文件中是MDN中的例子，不是自己写的，但感觉挺有用的，自己没想到。[地址]（https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Practical_positioning_examples)

## 知识点
*  demo.html

** “单页应用”--你可能会想：”为什么不仅仅做独立的选项卡为一个独立的网页，然后通过点击不同的标签来在不同的页面跳转来达到这个效果？“这样代码可能会简单一些，是的。但是这样每个独立的”页面“视图将会实际上是一个新加载的网页，跨视图更难保存信息，并把这个特征融入一个更大的UI设计。另外，所谓的”单页应用“正在变得非常流行——尤其是移动网页UI——因为把一切的服务放在一个单独的文件上可以减少HTTP请求的数量来浏览所有内容，从而提高性能。
**  demo用到的主要是用到定位，点击改变z-index，默认的z-index 一般都是0

* 突然想到布局方式除了以下要编写的float、position、flex（grid）布局外，还有一种我觉得也挺重要的---inline-block布局，[inline-block布局方式](http://zh.learnlayout.com/inline-block.html)。感觉inline-block布局更简单啊！
* demo2.html
** 表单的使用规范  [百度表单使用规范](https://github.com/ecomfe/spec/blob/master/html-style-guide.md#user-content-6-%E8%A1%A8%E5%8D%95)
** 组合选择器实现点击效果：改变asidede 位置
``` 
input[type=checkbox]:checked + aside {
  right: 0px;
}
```
* layout_float/demo_float.html(float 完成要求（常用布局）)
** float 定位都会脱离文档流
** 布局时常常需要计算width，margin之类的，设置box-szing： border-box简单点
**  float 布局时，DOM树结构不同（元素的顺序不一样，对结果产生很大影响，要加以利用，例如第4个布局，改变main、extra顺序，就很简单了）
* layout_position/demo_position.html(position布局)
** 为了设置左边固定，右边自适应，右边的宽度需要设置为：
```
width: calc(100%-300px);
```
发现不起作用，然后修改：
```
width: calc(100% - 300px);
起到了作用，原来还必须要空格 
** 突然想起来比如固比固的三列布局，不一定就要用圣杯布局或者双飞翼布局，就用float或者position等等也可以实现，圣杯布局和双飞翼只是能保证中间的先渲染
** 块元素默认占据一行的宽度，若设为position，一是脱离文档流，二是虽然display为block；但其宽度为最小宽度，要多宽都必须得设置
**本页面使用width：calc()属性的，可以考虑是否可以通过改变渲染顺序、设置margin、position完成任务(思路为：这需要避免设置要自适应元素的宽度，所以该元素不能用position，那么需要先渲染该元素，设置相应的margin，让固定宽度的元素定位到那个margin处，参考本页面中第三个实例（左边固定，右边自适应），这种情况下可能要考虑设置高度，因为会对后来的因素有影响)
* layout_flex/demo_flex.html(flex完成要求（常用布局）)
** flex中若要自适应布局全都用的calc()属性，没有想到别的办法
* design/index.html、indexError.html
** 主导航的li设为inline-block,导致中间有间隙，需要去除
** indexError.html因为要自适应宽度，所以不嫩设置宽度，使用float，结果导致一行内元素不是均匀排列
** index.html采用index布局，但是显示效果和indexError.html的效果差不多，没有占满一行，最后设置了每个元素的宽度才达成目标
**没有解决：导航HOME下应该没有下划线，没有想到去掉的办法