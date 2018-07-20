第三十九天到第四十一天：我是精明的小卖家（四）
==============================
[demo](https://wkstudy.github.io/2018ife/39/smartSailer/index.html)

## 知识点
* 使用location.hash
* pushstate、popstate、replacestate的使用，[参考网址1](http://www.zhangxinxu.com/wordpress/?p=3432)[参考网址2](http://blog.csdn.net/q1056843325/article/details/60607402)
>> 可参考demoPushstate.html中的思路（这是使用pushState等的总体思路）


## 犯的错
* 对于当dom.checked == true时，这时的chencbox是处于没有点击要执行点击的情况，还是已经点击要执行取消点击的操作，我发现还是没有弄明白，在31-33天的task里，以为懂了，结果发现到这里好像情况相反，以后遇到可以多试试。
* 关于pushState()等的使用，走了弯路，具体情况请看app.js中的相关注释（错误的地方和解决思路都写的很清楚，这里主要是针对发生前进，后退，触发popstate的时候）