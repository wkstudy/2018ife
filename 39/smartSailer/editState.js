/*
	主要负责控制table的状态
*/
//mouseover的时候，给这个td加一个image
function addPic(dom) {
	if (isNaN(parseInt(dom.parentNode.querySelectorAll('span')[0].innerHTML))) {
		return false;
	}
	if (dom.parentNode.querySelectorAll('span').length <= 2) {
		var span = document.createElement('span');
		span.className = 'glyphicon glyphicon-pencil';
		dom.parentNode.appendChild(span);
		span = null;
	}
}
function dispearPic(dom) {
	if(dom.parentNode.querySelector('span.glyphicon')) {
		var pic = dom.parentNode.querySelector('span.glyphicon');
		dom.parentNode.removeChild(pic);
	}
}
//点击出现两个按钮
function showTwoSpan(dom) {
	if (isNaN(parseInt(dom.parentNode.querySelectorAll('span')[0].innerHTML))) {
		return false;
	}
	//如果已经点击过其他td了，就先把那个取消，再继续
	if (!isNaN(parseInt(dom.innerHTML))) {
		if (document.querySelector('#cancel')) {
			var cancel = document.querySelector('#cancel');
			cancel.parentNode.removeChild(cancel.nextSibling);
			cancel.parentNode.querySelector('input').style.display = 'none';
			cancel.parentNode.querySelectorAll('span')[0].style.display = 'inline';
			cancel.parentNode.removeChild(cancel);
		}
	}
	//只有两个span的时候，一个显示数据，一个铅笔的span
	if (dom.parentNode.querySelectorAll('span').length <= 2) {
		dom.parentNode.querySelector('input').style.display = 'block';
		dom.parentNode.querySelectorAll('span')[0].style.display = 'none';
		var cancel = document.createElement('span'),
			sure = document.createElement('span');
		cancel.id = 'cancel';
		sure.id = 'sure';
		cancel.innerHTML = '取消';
		sure.innerHTML = '确定';
		cancel.style.marginRight = '10px';
		dom.parentNode.appendChild(cancel);
		dom.parentNode.appendChild(sure);
		cancel = null;
		sure = null;
	}
	dispearPic(dom);
}
//取消
function cancel(dom) {
	dom.parentNode.removeChild(dom.nextSibling);
	dom.parentNode.querySelector('input').style.display = 'none';
	dom.parentNode.querySelectorAll('span')[0].style.display = 'inline';
	dom.parentNode.removeChild(dom);
}
//确定
function sure(dom) {
	if (isNaN(Number(dom.parentNode.querySelector('input').value))) {
		alert('必须是数字');
		dom.parentNode.querySelector('input').value = dom.parentNode.querySelectorAll('span')[0].innerHTML;
	}else {
		dom.parentNode.querySelectorAll('span')[0].innerHTML = dom.parentNode.querySelector('input').value;
		dom.parentNode.querySelector('input').style.display = 'none';
		dom.parentNode.querySelectorAll('span')[0].style.display = 'inline';
		dom.parentNode.removeChild(dom.parentNode.querySelector('#cancel'));
		dom.parentNode.removeChild(dom.parentNode.querySelector('#sure'));
	}
}
//input 输入esc、enter
function inputEdit(e) {
	if (e.keyCode == 27) {
		//Esc
		cancel(e.target.parentNode.querySelector('#cancel'));
	}else if (e.keyCode == 13) {
		//Enter
		sure(e.target);
	}
}
//点击table-warpper以外的地方，相当于点击取消按钮
function cancelAnather(domFir,domSec) {
	if (! (domFir == domSec || domFir.contains(domSec))) {
		if (document.querySelector('#cancel')) {
			cancel(document.querySelector('#cancel'));
		}
	}
}