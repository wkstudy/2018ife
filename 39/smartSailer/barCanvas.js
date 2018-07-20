/*
	1整个图宽 左右留边20，高上下留边20
	2 柱子间隔10px 宽((width - 40) - 10* 13)/12px 
*/
function createBar(domid,arr,width,height) {
	width = parseInt(width);
	height = parseInt(height);
	var drawing = document.getElementById(domid);
	drawing.width = width;
	drawing.height = height;
	if (drawing.getContext) {
		var ctx = drawing.getContext('2d');
		ctx.lineWidth = '1px';
		//清空画布
		ctx.clearRect(0,0,width,height);
		//轴
		ctx.beginPath();
		ctx.moveTo(20,height - 20);
		//x轴
		ctx.lineTo(width - 20,height - 20);
		ctx.moveTo(20,height - 20);
		//y轴
		ctx.lineTo(20,10);
		ctx.stroke();
		//图例
		ctx.fillStyle = '#AED4C3';
		ctx.moveTo(40, 10);
		ctx.fillRect(40,10,30,20);
		ctx.font = 'normal 14px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseLine = 'middle';
		ctx.strokeText(arr.region + '-' + arr.product,60,50);

		//画柱状图
		var len = arr.sale.length,
			i,
			max,
			min,
			barHeight;
		max = arr.sale[0];
		min = arr.sale[0];
		for (i = 1;i < len;i++) {
			if (arr.sale[i] > max) {
				max = arr.sale[i];
			}
			if (arr.sale[i] < min) {
				min = arr.sale[i];
			}
		}
		barHeight = (height - 40) / max;
		barWidth = ((width - 40) - 10* 13) / 12;
		ctx.fillStyle = '#AED4C3';
		for (i = 0;i < len;i++) {
			ctx.moveTo(20 + (i + 1) * 10 + i * barWidth,height - 20 - barHeight * arr.sale[i]);
			ctx.fillRect(20 + (i + 1) * 10 + i * barWidth,height - 20 - barHeight * arr.sale[i],barWidth,barHeight * arr.sale[i]);
			//顺便画个轴线
			ctx.moveTo(20 + (i + 1) * 10 + i * barWidth + barWidth / 2,height - 20);
			ctx.lineTo(20 + (i + 1) * 10 + i * barWidth + barWidth / 2,height  - 10);
			ctx.stroke();
		}
	}
}