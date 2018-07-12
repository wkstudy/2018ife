/*
	折线图
	1 每个数据用一个直径为5的圆表示
	2 两个点之间间隔90px
	3 点最高150px
*/
function createLine(domid,arr) {
	var drawing = document.getElementById(domid);
	if (drawing.getContext) {
		var ctx = drawing.getContext('2d');
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
		//画折线图
		var len = arr.sale.length,
			i,
			max,
			lineHeight;
		max = arr.sale[0];
		for (i = 1;i < len;i++) {
			if (arr.sale[i] > max) {
				max = arr.sale[i];
			}
		}
		barHeight = 150 / max;
		// barHeight = 50 / min;
		ctx.fillStyle = '#AED4C3';
		for (i = 0;i < len;i++) {
			//画圆
			ctx.moveTo(20 + (i + 1) * 80 + 2.5,250 - barHeight * arr.sale[i]);
			ctx.arc(20 + (i + 1) * 80 + 2.5,250 - barHeight * arr.sale[i],2.5,0 ,2 * Math.PI);
			ctx.fill();
			//连接圆
			if (i > 0) {
				ctx.moveTo(20 + (i + 1) * 80,250 - barHeight * arr.sale[i]);
				ctx.lineTo(20 + i * 80 ,250 - barHeight * arr.sale[i - 1]);
			}
			//顺便画个轴线
			ctx.moveTo(20 + (i + 1) * 80,250);
			ctx.lineTo(20 + (i + 1) * 80,260);
			ctx.stroke();
		}
	}
}