第四十二天到第四十三天：开一家餐厅吧（一）
==============================
[demo](https://wkstudy.github.io/2018ife/42/restaurant/index.html)

## 知识点
* requestAnimationFrame()方法
>>```
>>requestAnimationFrame(loop);//递归的执行某个函数
>>```
* 关于es6，主要参考[阮一峰](http://es6.ruanyifeng.com/)


## 犯的错
* 这里的寄生组合式继承其实用错了，没有改，参考《JavaScript高级程序设计》p172
```
Waiter.prototype = Staff.prototype;
Waiter.prototype.constructor = Waiter;
```
这里本该建立一个父类原型的副本，然后把这个副本给子类Waiter，上面的代码其实是让子类引用直接指向了父类原型，正确的应该是
```
function inheritPrototype (subType,superType) {
	var prototype = Object.create(superType.prototype);//建立副本(书上是object(superType.prototype),那是大神在es5提出object.create()方法之前自己实现的。)
	prototype.constructor = subType;//为副本建立constructor，弥补因重写原型而失去的默认的constructor属性
	subType.prototype = prototype;//副本赋给子类原型
}
```