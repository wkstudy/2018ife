/*
	折线图
	1 整个图宽 左右留边20，高上下留边20
	2 每个数据用一个直径为5的圆表示
	2 两个点之间间隔 ((width - 40) - 6 * 12)/13
*/
function createLine(domid,arr,w,h) {
	w = parseInt(w);
	h = parseInt(h);
	var drawing = document.getElementById(domid);
	drawing.width = w;
	drawing.height = h;
	if (drawing.getContext) {
		var ctx = drawing.getContext('2d');
		//清空画布
		ctx.clearRect(0,0,w,h);
		ctx.lineWidth = '1px';
		//轴
		ctx.beginPath();
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
		barHeight = (h - 40) / max;
		widthGap = ((w - 40) - 6 * 12) / 13;
		// barHeight = 50 / min;
		ctx.fillStyle = '#AED4C3';
		for (i = 0;i < len;i++) {
			//画圆
			ctx.moveTo(20 + (i + 1) * widthGap + 2.5,h - 20 - barHeight * arr.sale[i]);//圆上一点
			ctx.arc(20 + (i + 1) * widthGap + 2.5,h - 20 - barHeight * arr.sale[i],2.5,0 ,2 * Math.PI);
			ctx.fill();
			//连接圆
			if (i > 0) {
				ctx.moveTo(20 + (i + 1) * widthGap,h - 20 - barHeight * arr.sale[i]);
				ctx.lineTo(20 + i * widthGap ,h - 20 - barHeight * arr.sale[i - 1]);
			}
			//顺便画个轴线
			ctx.moveTo(20 + (i + 1) * widthGap,h - 20);
			ctx.lineTo(20 + (i + 1) * widthGap,h - 10);
			ctx.stroke();
		}
	}
}