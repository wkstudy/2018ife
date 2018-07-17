//对createTable.js进行重构 ,减少冗余
/* 
	1: 创建一行表格的时候代码相同，可以写个函数
		1-1 ：创建表格时，除了多个商品、多个地区外，其他都是直接往tbody中放，为了能复用，都统一改为多个商品、多个地区的写法。
			1-1-1:仔细一看这四种情况里面又都有些不同，所以放弃了。。。
	2：多个商品、多个地区这种情况就是多组（1个地区、多个商品），可以考虑
		2-1：将1个地区、多个商品用函数表示，多个商品、多个地区用这个函数就行。
*/
function createTableAddInput(divFir,divSec,arr) {
	var regionNum = divFir.querySelectorAll("input[type = 'checkbox']:checked"),//注意这个还可能包括全选按钮
		productNum = divSec.querySelectorAll("input[type = 'checkbox']:checked"),
		table = document.createElement('table'),
		thead = document.createElement('thead'),
		tbody = document.createElement('tbody'),
		span = null,
		input = null,
		th = null,
		tr = null,
		td = null,
		i,
		j,
		k,
		q,
		lens,
		fragment,//存贮每段tr，然后放到tbody中
		len;
	len = arr[0].sale.length + 2;//表头长度
	//表头
	tr = document.createElement('tr');
	if (regionNum.length == 1 && productNum.length == 1) {
		for (i = 0;i < len;i++) {
			th = document.createElement('th');
			if (i == 0) {
				th.innerHTML = '商品';
			}else if (i == 1) {
				th.innerHTML = '地区';
			}else {
				th.innerHTML = i - 1 + '月';
			}
			tr.appendChild(th);
		}
	}else if (regionNum.length > 1 && productNum.length > 1) {
		for (i = 0;i < len;i++) {
			th = document.createElement('th');
			if (i == 0) {
				th.innerHTML = '地区';
			}else if (i == 1) {
				th.innerHTML = '商品';
			}else {
				th.innerHTML = i - 1 + '月';
			}
			tr.appendChild(th);
		}
	}else if (regionNum.length > 1 && productNum.length == 1) {
		for (i = 0;i < len;i++) {
			th = document.createElement('th');
			if (i == 0) {
				th.innerHTML = '商品';
			}else if (i == 1) {
				th.innerHTML = '地区';
			}else {
				th.innerHTML = i - 1 + '月';
			}
			tr.appendChild(th);
		}
	}else if (regionNum.length == 1 && productNum.length > 1) {
		for (i = 0;i < len;i++) {
			th = document.createElement('th');
			if (i == 0) {
				th.innerHTML = '地区';
			}else if (i == 1) {
				th.innerHTML = '商品';
			}else {
				th.innerHTML = i - 1 + '月';
			}
			tr.appendChild(th);
		}
	}
	thead.appendChild(tr);
	//tbody
	len = arr.length;
	if (regionNum.length == 1 && productNum.length == 1) {
		fragment = document.createDocumentFragment();
		for (i = 0; i < len;i++) {
			if (arr[i].region == regionNum[0].value && arr[i].product == productNum[0].value) {
				tr = document.createElement('tr');
				lens = arr[i].sale.length;
				for (j = 0;j < lens + 2;j++) {
					td = document.createElement('td');
					span = document.createElement('span');
					input = document.createElement('input');
					input.type = 'text';
					if (j == 0) {
						// td.innerHTML = arr[i].product;
						span.innerHTML = arr[i].product;
						input.value = arr[i].product;
						input.setAttribute('readonly', 'true');
					}else if (j == 1) {
						// td.innerHTML = arr[i].region;
						span.innerHTML = arr[i].region;
						input.value = arr[i].region;
						input.setAttribute('readonly', 'true');
					}else {
						// td.innerHTML = arr[i].sale[j - 2];
						span.innerHTML = arr[i].sale[j - 2];
						input.value = arr[i].sale[j - 2];
					}
					td.appendChild(span);
					td.appendChild(input);
					tr.appendChild(td);
				}
				fragment.appendChild(tr);
			}
		}

		tbody.appendChild(fragment);
	}else if (productNum.length == 1 && regionNum.length > 1) {
		//一个商品，多个地区
		fragment = document.createDocumentFragment();
		for (i = 0;i < len;i++) {
			if (arr[i].product == productNum[0].value) {
				for (j = 0;j < regionNum.length;j++) {
					if (arr[i].region == regionNum[j].value) {
						tr = document.createElement('tr');
						lens = arr[i].sale.length;
						for (k = 0;k < lens + 2;k++) {
							td = document.createElement('td');
							span = document.createElement('span');
							input = document.createElement('input');
							input.type = 'text';
							if (k == 0) {
								// td.innerHTML = arr[i].product;
								span.innerHTML = arr[i].product;
								input.value = arr[i].product;
								input.setAttribute('readonly', 'true');
							}else if (k == 1) {
								// td.innerHTML = arr[i].region;
								span.innerHTML = arr[i].region;
								input.value = arr[i].region;
								input.setAttribute('readonly', 'true');
							}else {
								// td.innerHTML = arr[i].sale[k -2];
								span.innerHTML = arr[i].sale[k - 2];
								input.value = arr[i].sale[k - 2];
							}
							td.appendChild(span);
							td.appendChild(input);
							tr.appendChild(td);
						}
						fragment.appendChild(tr);
					} 
				}
			}
		}
		//设置rowspan
		setRowspan(tr,fragment);
		tbody.appendChild(fragment);
	}else if (regionNum.length == 1 && productNum.length > 1) {
		//一个地区，多个商品
		fragment = oneRegNPro(len,arr,regionNum,0,productNum);
		//设置rowspan
		setRowspan(tr,fragment);
		tbody.appendChild(fragment);
	}else if (regionNum.length > 1 && productNum.length > 1) {
		//可以转换为多组（1个地区对应多组商品）
		for (q = 0;q < regionNum.length && regionNum[q].value != '全选';q++){
			//一个地区，多个商品
			fragment = oneRegNPro(len,arr,regionNum,q,productNum);
			//设置rowspan
			setRowspan(tr,fragment);
			tbody.appendChild(fragment);
		}

	}

	table.appendChild(thead);
	table.appendChild(tbody);
	//table
	document.getElementById('table-wrapper').innerHTML = null;//这样删除子元素好像不好
	document.getElementById('table-wrapper').appendChild(table);
	tr = null;
	td = null;
	th = null;
	span = null;
	input = null;
	thead = null;
	tbody = null;
	table = null;
}

function setRowspan(tr,fragment) {
	tr = fragment.querySelectorAll('tr');
	tr[0].childNodes[0].rowSpan = tr.length;
	for (i = 1;i < tr.length;i++) {
		tr[i].removeChild(tr[i].childNodes[0]);
	}
}

function oneRegNPro(len,arr,regionNum,q,productNum){
	//一个地区、多个商品
	var fragment = document.createDocumentFragment(),
		i,
		j,
		tr,
		lens,
		td;
	for (i = 0;i < len;i++) {
		if (arr[i].region == regionNum[q].value) {
			for (j = 0;j < productNum.length;j++) {
				if (arr[i].product == productNum[j].value) {
					tr = document.createElement('tr');
					lens = arr[i].sale.length;
					for (k = 0;k < lens + 2;k++) {
						td = document.createElement('td');
						span = document.createElement('span');
						input = document.createElement('input');
						input.type = 'text';
						if (k == 0) {
							// td.innerHTML = arr[i].region;
							span.innerHTML = arr[i].region;
							input.value = arr[i].region;
							input.setAttribute('readonly', 'true');
						}else if (k == 1) {
							// td.innerHTML = arr[i].product;
							span.innerHTML = arr[i].product;
							input.value = arr[i].product;
							input.setAttribute('readonly', 'true');
						}else {
							// td.innerHTML = arr[i].sale[k -2];
							span.innerHTML = arr[i].sale[k - 2];
							input.value = arr[i].sale[k - 2];
						}
						td.appendChild(span);
						td.appendChild(input);
						tr.appendChild(td);
					}
					fragment.appendChild(tr);
				} 
			}
		}
	}
	return fragment;
}