第三十七天到第三十八天：我是精明的小卖家（三）
==============================
[demo](https://wkstudy.github.io/2018ife/37/smartSailer/index.html)

## 知识点
* focus、blur不支持事件代理，解决办法（用事件捕获，ie用focusin、focusout）[参考](https://www.cnblogs.com/demix/archive/2009/10/15/1584022.html)
* localStroage 只能存储字符串格式，对于对象或者数组，保存前需要JSON.Stringify();使用前需JSON.parse();
* 以后不能确定用mouseenter、mouseleave还是mouseover、mouseout的话，试一下。
* 思路（点击该单元格以外的页面其他任何地方，除了响应对应行为外，同时等同于点击了取消，输入状态消失）
```
//点击table-warpper以外的地方，相当于点击取消按钮
function cancelAnather(domFir,domSec) {
	if (! (domFir == domSec || domFir.contains(domSec))) {
		if (document.querySelector('#cancel')) {
			cancel(document.querySelector('#cancel'));
		}
	}
}
//页面全部的点击事件，判断e.target是否来自某个目标区域或者等于目标区域本身
document.addEventListener('click', function(e) {
	cancelAnather(document.getElementById('table-wrapper'),e.target);
}, false)
```