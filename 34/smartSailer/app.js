createCheckbox(document.getElementById('region-radio-wrapper'),['华东','华南','华北'],'region');
createCheckbox(document.getElementById('product-radio-wrapper'),['手机','笔记本','智能音箱'],'product');
document.getElementById('product-radio-wrapper').addEventListener('click', function(e){
	if (e.target.nodeName.toLowerCase() == 'input') {
		createTable(document.getElementById('region-radio-wrapper'),this,sourceData);//生成table
		bindTrMouseover();//绑定tr mouseover事件
		createMultiLine();//绘制所有的折线
	}
}, false)
document.getElementById('region-radio-wrapper').addEventListener('click', function(e) {
	if (e.target.nodeName.toLowerCase() == 'input') {
		createTable(this,document.getElementById('product-radio-wrapper'),sourceData);//生成table
		bindTrMouseover();//绑定tr mouseover事件
		createMultiLine();//绘制所有折线
	}
}, false)
document.getElementById('table-wrapper').addEventListener('mouseleave', function(e) {
	createMultiLine();//绘制所有折线
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
					if (this.childNodes[0].innerText == sourceData[j].product && this.childNodes[1].innerText == sourceData[j].region || this.childNodes[1].innerText == sourceData[j].product && this.childNodes[0].innerText == sourceData[j].region) {
						createBar('bar',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('bar'),null).width,document.defaultView.getComputedStyle(document.getElementById('bar'),null).height);
						createLine('line',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('line'),null).width,document.defaultView.getComputedStyle(document.getElementById('line'),null).height);
						break;
					}
				}
			}else {
				//找到离这个最近的有14个子元素的，说明这行第一个正是我们找的元素。
				for(k =i - 1; k >= 1;k--) {
					if (trArr[k].childNodes.length == 14) {
						temp = trArr[k].childNodes[0].innerText;
						break;
					}
				}
				for (j = 0;j < sourDatalen;j++) {
					if (this.childNodes[0].innerText == sourceData[j].product && temp == sourceData[j].region || temp == sourceData[j].product && this.childNodes[0].innerText == sourceData[j].region) {
						createBar('bar',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('bar'),null).width,document.defaultView.getComputedStyle(document.getElementById('bar'),null).height);
						createLine('line',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('line'),null).width,document.defaultView.getComputedStyle(document.getElementById('line'),null).height);
						break;
					}
				}
			}
		}, false);
	}
}