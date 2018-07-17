/*
	1 存储为sourceData的格式，方便其他使用sourceData格式的函数的调用
*/
function save() {
	var tr = document.getElementById('table-wrapper').querySelectorAll('tr'),
		data = [],//存储全部数据
		i,
		j,
		len = tr.length,
		tdlen,
		first,//存储寻找到的tr == 13 缺失的值
		td;
	//i = 1 时是thead中的内容
	for (i = 1;i < len;i++) {
		let obj = new Object();
		td = tr[i].querySelectorAll('td');
		tdlen = td.length;
		if (tdlen == 14) {
			if (tr[0].childNodes[0].innerHTML == '商品') {
				obj.product = td[0].querySelector('input').value;
				obj.region = td[1].querySelector('input').value;
			}else {
				obj.product = td[1].querySelector('input').value;
				obj.region = td[0].querySelector('input').value;
			}
		}else {
			//先找到这行缺失的值
			for (j = i - 1;j > 0;j--) {
				if (tr[j].childNodes.length == 14) {
					first = tr[j].childNodes[0].querySelector('input').value;
					break;
				}
			}
			if (tr[0].childNodes[0].innerHTML == '商品') {
				obj.product = first;
				obj.region = td[0].querySelector('input').value;
			}else {
				obj.product = td[0].querySelector('input').value;
				obj.region = first;
			}
		}
		obj.sale = [];
		for(j = 0;j < 12;j++) {
			if (tdlen == 14) {
				obj.sale.push(Number(td[j + 2].querySelector('input').value));
			}else {
				obj.sale.push(Number(td[j + 1].querySelector('input').value));
			}
			
		}
		data.push(obj);
	}
	//localStroage只能存储字符串，所以对于对象和数组要转化为字符串
	window.localStorage.setItem('info', JSON.stringify(data));
}
//返回true,使用localStroage,反之用sourceData(给定的数据)
function uselocaStroage (divFir,divSec){
	if (localStorage.info == null) {
		console.log('nn');
		return false;//如果info不存在
	}
	var data = JSON.parse(window.localStorage.getItem('info'));
	if (data.length == 0) {
		console.log(2);
		return false;
	}
	var regionNum = divFir.querySelectorAll("input[type = 'checkbox']:checked"),//注意这个还可能包括全选按钮
		productNum = divSec.querySelectorAll("input[type = 'checkbox']:checked"),
		i,
		j,
		k,
		count,
		rlen = regionNum.length,
		plen = productNum.length,
		dlen = data.length,
		countRegion = rlen,
		countProduct = plen;
	count = 0;
	for (i = 0;i < rlen;i++) {
		if (regionNum[i].value != '全选') {
			for (j = 0;j < plen;j++) {
				if (productNum[j].value != '全选') {
					for (k = 0;k < dlen;k++) {
						if (data[k].region == regionNum[i].value && data[k].product == productNum[j].value) {
							count++;
						}
					}
				}
			}
		}else {
			countRegion--;
		}
	}
	//不能放到上面的循环里面，会出错的。
	for (j = 0;j < plen;j++) {
		if (productNum[j].value == '全选') {
			countProduct--;
		}
	}
	if (count == countProduct * countRegion) {
		console.log(localStorage.info);
		return true;
	}else {
		return false;
	}
}