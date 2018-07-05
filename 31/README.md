第三十一到第三十三天：我是精明的小卖家（一）
==============================
[demo](https://wkstudy.github.io/2018ife/31/index.html)

## 知识点
* 处理js动态生成table中的rowspan，这里采用的是先不设置，生成之后再返回来设置rowspan
* 这里算是第一次重构了自己的代码，将少了部分冗余
>>  createTable.js----> createTableRefactoring.js

## 犯过的错
* js生成input[checkbox] 框，结果不显示文字，---> checkbox value值是不显示的，innerHTML等也无效，只能把要显示的文字放到外面的标签（如label）中。
* 常规往label中插入input[checkbox]，框在文字的后面，若要改变顺序的话，需要：
>> ```
>> label.insertBefore(checkAll,label.childNodes[0]);//label.childNodes[0] 是你插入的label.innerHTML.
>> ```
*  input checkbox 取消选中
```
arrCheckbox[i].checked = false;//flase加引号错误
```