createCheckbox(document.getElementById('region-radio-wrapper'),['华东','华南','华北'],'region');
document.getElementById('region-radio-wrapper').addEventListener('click', function(e) {
	inputClick('region-radio-wrapper',e,document.getElementById('region-radio-wrapper'),document.getElementById('product-radio-wrapper'));
}, false)
createCheckbox(document.getElementById('product-radio-wrapper'),['手机','笔记本','智能音箱'],'product');
document.getElementById('product-radio-wrapper').addEventListener('click', function(e) {
	inputClick('product-radio-wrapper',e,document.getElementById('region-radio-wrapper'),document.getElementById('product-radio-wrapper'));
}, false)
if (!getUrlParameter()) {
	//默认选中华南、手机
	var obj = {};
	obj.rd = 1;
	obj.rn = 0;
	obj.rb = 0;
	obj.ps = 1;
	obj.pb = 0;
	obj.pz = 0;
	obj.rall = 0;
	obj.pall = 0;
	history.replaceState(obj,'',location.href + '?rd=' + obj.rd + '&rn=' + obj.rn + '&rb=' + obj.rb + '&rall=' + obj.rall + '&ps=' + obj.ps + '&pb=' + obj.pb + '&pz=' + obj.pz + '&pall=' + obj.pall);
}
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
window.addEventListener('popstate', function (e) {
	if (e.state) {
		// popevent(e); 
		popEvent(e);
	}else {
		console.log('不触发e.state')
	}
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
//获取url中的参数
function getUrlParameter() {
	var url = location.href,
		str,
		arr = [],
		len,
		res = [],
		i,
		start = url.indexOf('?');
	if (start == -1) {
		return false;
	}
	start++;
	str = url.substring(start);
	arr = str.split('&');
	len = arr.length;
	for (i = 0;i < len;i++) {
		res[arr[i].split('=')[0]] = arr[i].split('=')[1];
	}
	return res;
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

/*
	这里要使用pushstate的话，准备每次按钮 click的时候，记录下全部被选中的按钮，然后放到pushstate中，然后在点击前进后退（触发popstate）时，模拟鼠标事件，对没选中的取消选中，选中的进行选中。
	网址采用的形式为：file:///F:/GitHub/2018ife/39/smartSailer/index.html?rd=1&rn=0&rb=1&rall=0&ps=1&pb=0&pz=1&pall=0(其中1代表选中)

	问题：
		1 可以点击后退，但不能生成前进
		2 只点击一次，可以后退，但若点击一次以上，第一次后退是正常的，后面每次需要点击两次或两次以上才能有后退一次的效果
	可能的原因：点击后退或者点击前进，会触发popstate(),这里会执行一次模拟鼠标事件，这也相当于执行了一次鼠标点击，相当于一次操作所记录，那么对于用户来说就相当于多了一次操作
	
	分析结论：触发popstate事件后，正常的操作应该是直接利用这里的state数据进行显示（渲染），而不是模拟进行上一步的操作。
	
	解决方式：原来的采用的方法是popevent(e),现在改为用popEvent(e)
	
	finall: success!!!!


*/
function popEvent (e) {
	if (e.state.rd == 1) {
		document.getElementById('region-radio-wrapper').querySelectorAll('input')[0].checked = true;
	}else {
		document.getElementById('region-radio-wrapper').querySelectorAll('input')[0].checked = false;
	}
	if (e.state.rn == 1) {
		document.getElementById('region-radio-wrapper').querySelectorAll('input')[1].checked = true;
	}else {
		document.getElementById('region-radio-wrapper').querySelectorAll('input')[1].checked = false;
	}
	if (e.state.rb == 1) {
		document.getElementById('region-radio-wrapper').querySelectorAll('input')[2].checked = true;
	}else {
		document.getElementById('region-radio-wrapper').querySelectorAll('input')[2].checked = false;
	}
	if (e.state.rall == 1) {
		document.getElementById('region-radio-wrapper').querySelectorAll('input')[3].checked = true;
	}else {
		document.getElementById('region-radio-wrapper').querySelectorAll('input')[3].checked = false;
	}
	if (e.state.ps == 1) {
		document.getElementById('product-radio-wrapper').querySelectorAll('input')[0].checked = true;
	}else {
		document.getElementById('product-radio-wrapper').querySelectorAll('input')[0].checked = false;
	}
	if (e.state.pb == 1) {
		document.getElementById('product-radio-wrapper').querySelectorAll('input')[1].checked = true;
	}else {
		document.getElementById('product-radio-wrapper').querySelectorAll('input')[1].checked = false;
	}
	if (e.state.pz == 1) {
		document.getElementById('product-radio-wrapper').querySelectorAll('input')[2].checked = true;
	}else {
		document.getElementById('product-radio-wrapper').querySelectorAll('input')[2].checked = false;
	}
	if (e.state.pall == 1) {
		document.getElementById('product-radio-wrapper').querySelectorAll('input')[3].checked = true;
	}else {
		document.getElementById('product-radio-wrapper').querySelectorAll('input')[3].checked = false;
	}

	three();
}
function popevent (e) {
	var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		console.log(e.state);
		if (e.state.rd == 1) {
			if (!document.getElementById('region-radio-wrapper').querySelectorAll('input')[0].checked) {
				//原本没选中
				console.log(document.getElementById('region-radio-wrapper').querySelectorAll('input')[0].checked);
				document.getElementById('region-radio-wrapper').querySelectorAll('input')[0].dispatchEvent(event);
			}
		}else {
			if (document.getElementById('region-radio-wrapper').querySelectorAll('input')[0].checked) {
				document.getElementById('region-radio-wrapper').querySelectorAll('input')[0].dispatchEvent(event);
			}
		}
		if (e.state.rn == 1) {
			if (!document.getElementById('region-radio-wrapper').querySelectorAll('input')[1].checked) {
				//原本没选中
				document.getElementById('region-radio-wrapper').querySelectorAll('input')[1].dispatchEvent(event);
			}
		}else {
			if (document.getElementById('region-radio-wrapper').querySelectorAll('input')[1].checked) {
				document.getElementById('region-radio-wrapper').querySelectorAll('input')[1].dispatchEvent(event);
			}
		}
		if (e.state.rb == 1) {
			if (!document.getElementById('region-radio-wrapper').querySelectorAll('input')[2].checked) {
				//原本没选中
				document.getElementById('region-radio-wrapper').querySelectorAll('input')[2].dispatchEvent(event);
			}
		}else {
			if (document.getElementById('region-radio-wrapper').querySelectorAll('input')[2].checked) {
				document.getElementById('region-radio-wrapper').querySelectorAll('input')[2].dispatchEvent(event);
			}
		}
		if (e.state.ps == 1) {
			if (!document.getElementById('product-radio-wrapper').querySelectorAll('input')[0].checked) {
				//原本没选中
				document.getElementById('product-radio-wrapper').querySelectorAll('input')[0].dispatchEvent(event);
			}
		}else {
			if (document.getElementById('product-radio-wrapper').querySelectorAll('input')[0].checked) {
				document.getElementById('product-radio-wrapper').querySelectorAll('input')[0].dispatchEvent(event);
			}
		}
		if (e.state.pb == 1) {
			if (!document.getElementById('product-radio-wrapper').querySelectorAll('input')[1].checked) {
				//原本没选中
				document.getElementById('product-radio-wrapper').querySelectorAll('input')[1].dispatchEvent(event);
			}
		}else {
			if (document.getElementById('product-radio-wrapper').querySelectorAll('input')[1].checked) {
				document.getElementById('product-radio-wrapper').querySelectorAll('input')[1].dispatchEvent(event);
			}
		}
		if (e.state.pz == 1) {
			if (!document.getElementById('product-radio-wrapper').querySelectorAll('input')[2].checked) {
				//原本没选中
				document.getElementById('product-radio-wrapper').querySelectorAll('input')[2].dispatchEvent(event);
			}
		}else {
			if (document.getElementById('product-radio-wrapper').querySelectorAll('input')[2].checked) {
				document.getElementById('product-radio-wrapper').querySelectorAll('input')[2].dispatchEvent(event);
			}
		}
}