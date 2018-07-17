createCheckbox(document.getElementById('region-radio-wrapper'),['华东','华南','华北'],'region');
createCheckbox(document.getElementById('product-radio-wrapper'),['手机','笔记本','智能音箱'],'product');
//初始化时默认选中两个，所以要建table
three();
document.getElementById('product-radio-wrapper').addEventListener('click', function(e){
	if (e.target.nodeName.toLowerCase() == 'input') {
		three();
	}
}, false)
document.getElementById('region-radio-wrapper').addEventListener('click', function(e) {
	if (e.target.nodeName.toLowerCase() == 'input') {
		three();
	}
}, false)
document.getElementById('table-wrapper').addEventListener('mouseleave', function(e) {
	createMultiLine();//绘制所有折线
}, false)
//事件捕获
// document.getElementById('table-wrapper').addEventListener('blur', function(e) {
// 	if (e.target.nodeName.toLowerCase() == 'input') {
// 		if (isNaN(Number(e.target.value))) {
// 			alert('格式错误');
// 		}else {
// 			console.log('aiaiai');
// 		}
// 	}
// }, true)
document.getElementById('table-wrapper').addEventListener('mouseenter', function(e) {
	if (e.target.nodeName.toLowerCase() == 'span') {
		addPic(e.target);
	}
}, true)
document.getElementById('table-wrapper').addEventListener('mouseleave', function(e) {
	if (e.target.nodeName.toLowerCase() == 'span') {
		dispearPic(e.target);
	}
}, true)
document.getElementById('table-wrapper').addEventListener('click', function(e) {
	if (e.target.nodeName.toLowerCase() == 'span') {
		//弹出取消和确定
		showTwoSpan(e.target);
	}
	if (e.target.id == 'cancel') {
		cancel(e.target);
	}
	if (e.target.id == 'sure') {
		sure(e.target);
	}
}, false)
document.getElementById('table-wrapper').addEventListener('keydown', function(e) {
	if (e.target.nodeName.toLowerCase() == 'input') {
		inputEdit(e);
	}
}, false)
document.getElementById('save').addEventListener('click', save, false);
document.addEventListener('click', function(e) {
	cancelAnather(document.getElementById('table-wrapper'),e.target);
}, false)
//给每一个tr绑定mouseover
function bindTrMouseover() {
	var trArr = document.getElementById('table-wrapper').querySelectorAll('tr'),
		i,
		j,
		trlen = trArr.length,
		sourDatalen = sourceData.length,
		temp,
		k;
	//从i = 1循环，因为thead有一个tr需要排除
	for (i = 1 ;i < trlen;i++) {
		trArr[i].addEventListener('mouseover', function() {
			if (this.childNodes.length == 14) {
				for (j = 0;j < sourDatalen;j++) {
					if (this.childNodes[0].querySelector('span').innerText == sourceData[j].product && this.childNodes[1].querySelector('span').innerText == sourceData[j].region || this.childNodes[1].querySelector('span').innerText == sourceData[j].product && this.childNodes[0].querySelector('span').innerText == sourceData[j].region) {
						createBar('bar',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('bar'),null).width,document.defaultView.getComputedStyle(document.getElementById('bar'),null).height);
						createLine('line',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('line'),null).width,document.defaultView.getComputedStyle(document.getElementById('line'),null).height);
						break;
					}
				}
			}else {
				//找到离这个最近的有14个子元素的，说明这行第一个正是我们找的元素。
				for(k =i - 1; k >= 1;k--) {
					if (trArr[k].childNodes.length == 14) {
						temp = trArr[k].childNodes[0].querySelector('span').innerText;
						break;
					}
				}
				for (j = 0;j < sourDatalen;j++) {
					if (this.childNodes[0].querySelector('span').innerText == sourceData[j].product && temp == sourceData[j].region || temp == sourceData[j].product && this.childNodes[0].querySelector('span').innerText == sourceData[j].region) {
						createBar('bar',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('bar'),null).width,document.defaultView.getComputedStyle(document.getElementById('bar'),null).height);
						createLine('line',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('line'),null).width,document.defaultView.getComputedStyle(document.getElementById('line'),null).height);
						break;
					}
				}
			}
		}, false);
	}
}
//常常一起出现的三个函数 创建table、绑定tr、绘制所有折线
function three() {
	if (uselocaStroage(document.getElementById('region-radio-wrapper'),document.getElementById('product-radio-wrapper'))) {
		createTableAddInput(document.getElementById('region-radio-wrapper'),document.getElementById('product-radio-wrapper'),JSON.parse(window.localStorage.info));//生成table
		console.log('使用了localstroage');
	}else {
		createTableAddInput(document.getElementById('region-radio-wrapper'),document.getElementById('product-radio-wrapper'),sourceData);//生成table
	}
	bindTrMouseover();//绑定tr mouseover事件
	createMultiLine();//绘制所有的折线
}