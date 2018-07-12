/*
	1 柱子宽70px 间隔10px
	2 柱子最高150px
*/
function createBar(domid,arr) {
	var drawing = document.getElementById(domid);
	if (drawing.getContext) {
		var ctx = drawing.getContext('2d');
		//线
		ctx.lineWidth = '1px';
		//轴
		ctx.beginPath();
		ctx.moveTo(20,250);
		//x轴
		ctx.lineTo(990,250);
		ctx.moveTo(20,250);
		//y轴
		ctx.lineTo(20,10);
		ctx.stroke();
		//图例
		ctx.moveTo(800, 10);
		ctx.fillRect(800,10,30,20);
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
		barHeight = 150 / max;
		// barHeight = 50 / min;
		ctx.fillStyle = '#AED4C3';
		for (i = 0;i < len;i++) {
			ctx.moveTo(20 + (i + 1) * 10 + i * 70,250 - barHeight * arr.sale[i]);
			ctx.fillRect(20 + (i + 1) * 10 + i * 70,250 - barHeight * arr.sale[i],70,barHeight * arr.sale[i]);
			//顺便画个轴线
			ctx.moveTo(20 + (i + 1) * 10 + i * 70 + 35,250);
			ctx.lineTo(20 + (i + 1) * 10 + i * 70 + 35,260);
			ctx.stroke();
		}
	}
}