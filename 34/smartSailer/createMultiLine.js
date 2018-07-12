/*	
	多条折线图
	1: 获取表格中所有的数据，然后画出来
	2：每条不同的颜色，需要定义一个数组
	3：获取最大值已确定最高值
*/
function createMultiLine() {
	var color = ['#AED4C2','#DDA490','#8DB9BE','#6A7984','#D06E6B','#E58DC2','#FBB8A2','#FBE289','#91E5E7','#6FBAE1'];
	var trArr = document.getElementById('table-wrapper').querySelectorAll('tr'),
		i,
		j,
		trlen = trArr.length,
		sourDatalen = sourceData.length,
		temp,
		max,
		c,//记录折线的颜色
		k;
	c = 0;
	max = 0;
	//寻找最大值
	for (i = 1 ;i < trlen;i++) {
		if (trArr[i].childNodes.length == 14) {
			for (j = 2;j < 14;j++) {
				if (max < Number(trArr[i].childNodes[j].innerText)) {
					max = Number(trArr[i].childNodes[j].innerText);
				}
			}
		}else {
			for (j = 1; j < 13;j++) {
				if (max < Number(trArr[i].childNodes[j].innerText)) {
					max = Number(trArr[i].childNodes[j].innerText);
				}
			}
		}
	}
	//从i = 1循环，因为thead有一个tr需要排除
	for (i = 1 ;i < trlen;i++) {
		if (trArr[i].childNodes.length == 14) {
			for (j = 0;j < sourDatalen;j++) {
				if (trArr[i].childNodes[0].innerText == sourceData[j].product && trArr[i].childNodes[1].innerText == sourceData[j].region || trArr[i].childNodes[1].innerText == sourceData[j].product && trArr[i].childNodes[0].innerText == sourceData[j].region) {
					cMultiLine('line',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('line'),null).width,document.defaultView.getComputedStyle(document.getElementById('line'),null).height,max,color[c],i);
					c++;	
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
				if (trArr[i].childNodes[0].innerText == sourceData[j].product && temp == sourceData[j].region || temp == sourceData[j].product && trArr[i].childNodes[0].innerText == sourceData[j].region) {
					cMultiLine('line',sourceData[j],document.defaultView.getComputedStyle(document.getElementById('line'),null).width,document.defaultView.getComputedStyle(document.getElementById('line'),null).height,max,color[c],i);
					c++;
					break;
				}
			}
		}
	}
}
//这里的cMultiLine需要传递颜色,isfirst来判断是否需要重置画布
function cMultiLine(domid,arr,w,h,max,color,isfirst) {
	w = parseInt(w);
	h = parseInt(h);
	var drawing = document.getElementById(domid);
	if (isfirst == 1) {
		drawing.width = w;
		drawing.height = h;
	}
	if (drawing.getContext) {
		var ctx = drawing.getContext('2d');
		ctx.lineWidth = '1px';
		//轴
		ctx.beginPath();
		if (isfirst == 1) {
			ctx.strokeStyle = '#282923';
			ctx.moveTo(20,h - 20);
			//x轴
			ctx.lineTo(w - 20,h - 20);
			ctx.moveTo(20,h - 20);
			//y轴
			ctx.lineTo(20,20);
			ctx.stroke();
			//图例
			ctx.moveTo(w - 40, 20);
			ctx.fillRect(w - 40,10,30,20);
		}
		//画折线图
		var len = arr.sale.length,
			i,
			lineHeight;
		barHeight = (h - 40) / max;
		widthGap = ((w - 40) - 6 * 12) / 13;
		ctx.strokeStyle = color;
		for (i = 0;i < len;i++) {
			//画圆
			ctx.moveTo(20 + (i + 1) * widthGap + 2.5,h - 20 - barHeight * arr.sale[i]);
			ctx.arc(20 + (i + 1) * widthGap + 2.5,h - 20 - barHeight * arr.sale[i],2.5,0 ,2 * Math.PI);
			ctx.stroke();
			//连接圆
			if (i > 0) {
				ctx.moveTo(20 + (i + 1) * widthGap,h - 20 - barHeight * arr.sale[i]);
				ctx.lineTo(20 + i * widthGap ,h - 20 - barHeight * arr.sale[i - 1]);
			}
			//顺便画个轴线
			
			if (isfirst == 1) {
				ctx.moveTo(20 + (i + 1) * widthGap,h - 20);
				ctx.lineTo(20 + (i + 1) * widthGap,h - 10);
				ctx.strokeStyle = '#282923';
				ctx.stroke();
			}
		}
	}
	console.log(arr.region);
	console.log(arr.product)
}