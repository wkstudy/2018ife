第二十五到二十七天：倒数开始 滴答滴 滴答滴
==============================
## 知识点
* Date.UTC(),设置一个具体的时间。
* 求两个时间之间的差值(都getTime()换算成毫秒然后相减)
```
var cha = nowDate.getTime() - tDate.getTime();
```
* 主要是封装函数的思想，一个函数实现一个功能，不要混杂

## 犯过的错
* 求两个时间的差值：
```
var nowDate = new Date(),
tDate = new Date(Date.UTC(year,month,day,hour,minute,seconds)),
cha = nowDate.getTime() - tDate.getTime(),
```
这样其实是不对的，因为tDate实际用的是UTC时间标准，Date默认是本地市区，应该改为：
```
var nowDate = new Date(),
tDate = new Date(year,month,day,hour,minute,seconds),
cha = nowDate.getTime() - tDate.getTime(),
```
