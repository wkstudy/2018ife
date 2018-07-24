console.log('skr skr this is Bouncing balls ,来自MDN  check')
//小球
function Ball(x,y,vx,vy,color,size) {
	this.x = x;
	this.y = y;
	this.vx = vx;//小球在x方向的而速度
	this.vy = vy;
	this.color = color;
	this.size = size;
}
//画出自己
Ball.prototype.draw = function () {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x,this.y,this.size,0,2 * Math.PI);
	ctx.fill();
}
//小球移动
Ball.prototype.move = function () {
	if (this.x + this.size > width || this.x - this.size < 0) {
		this.vx = -this.vx;
	}
	if (this.y + this.size > height || this.y - this.size < 0) {
		this.vy = -this.vy;
	}

	this.x += this.vx;
	this.y += this.vy;
}
//小球碰撞检测
Ball.prototype.collisionDetect = function () {
	var i,
		distance,
		len = balls.length;

	for (i = 0;i < len;i++) {
		if (this != balls[i]) {
			distance = Math.sqrt((this.x - balls[i].x)*(this.x - balls[i].x) + (this.y - balls[i].y)*(this.y - balls[i].y));
			if (distance < this.size + balls[i].size) {
				this.color = 'rgba(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +',' + random(0.5,1) + ')';
				balls[i].color = 'rgba(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +',' + random(0.5,1) + ')';
			}
		}
	}
}
var canvas = document.querySelector('canvas');
if (canvas.getContext) {
	var ctx = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;


	var balls = [];
	while (balls.length < 30) {	
		var ball = new Ball(random(0,width),random(0,height),random(-7,7),random(-7,7),'rgba(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +',' + random(0.5,1) + ')',random(10,20));
		balls.push(ball);
	}
	// loop();
	setInterval(loo, 20);


}
function random(min,max) {
	var num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}
function loop () {
	ctx.fillStyle = 'rgba(0,0,0,0.25)';//bg color
	ctx.fillRect(0,0,width,height);

	while (balls.length < 50) {	
		var ball = new Ball(random(0,width),random(0,height),random(-7,7),random(-7,7),'rgba(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +',' + random(0.75,1) + ')',random(10,20));
		balls.push(ball);
	}

	for (var i = 0; i < balls.length; i++) {
		balls[i].draw();
		balls[i].move();
		balls[i].collisionDetect();
	}
	requestAnimationFrame(loop);
}
function loo () {
	//每次都设置一遍背景层，盖住了上一次的小球
	ctx.fillStyle = 'rgba(0,0,0,0.25)';//bg color
	ctx.fillRect(0,0,width,height);
	for (var i = 0; i < balls.length; i++) {
		balls[i].draw();
		balls[i].move();
		balls[i].collisionDetect();
	}
}