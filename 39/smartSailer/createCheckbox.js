function createCheckbox(id,arr,name) {
	var len = arr.length,
		i,
		checkAll = document.createElement('input'),
		label;
	checkAll.type = 'checkbox';
	checkAll.setAttribute('check-type', 'all');
	checkAll.value = '全选';
	checkAll.name = name;
	for (i = 0 ;i < len;i++) {
		var cbox = document.createElement('input'),
			label = document.createElement('label');
		cbox.type = 'checkbox';
		cbox.value = arr[i];
		cbox.name = name;
		label.innerHTML = arr[i];
		label.insertBefore(cbox,label.childNodes[0]);//复选框放到文字之后
		id.appendChild(label);
	}
	label = document.createElement('label');
	label.innerHTML = '全选';
	label.insertBefore(checkAll,label.childNodes[0]);//复选框放到文字之后
	id.appendChild(label);
	label = null;
	checkAll = null;
	cbox = null;
	id.querySelectorAll('input')[0].checked = true;//默认第一个被选中
	
}
function inputClick (id,e,domFir,domSec) {
	if (e.target.nodeName.toLowerCase() == 'input') {
		var arrCheckbox = document.getElementById(id).querySelectorAll('input'),
			i,
			len = arrCheckbox.length,
			temp = 0 ;//记录除了全选以外的按钮被选中的个数
		if (e.target.getAttribute('check-type') == 'all') {
			//全选
			if (!(e.target.checked)) {
				//取消选中 ->全部取消
				for (i = 0;i < len -1; i++) {
					arrCheckbox[i].checked = false;
				}
				arrCheckbox[0].checked = true;//必须至少有一个被选中
			}else {
				//选中全选按钮
				for (i = 0;i < len -1; i++) {
					arrCheckbox[i].checked = true;
				}
			}
		}else {
			//单选
			for (i = 0;i < len - 1;i++) {
				if (arrCheckbox[i].checked) {
					temp++;
				}
			}
			if (!(e.target.checked)) {
				//这个选中了，执行取消操作
				if (temp == 0) {
					e.preventDefault();
				}
				arrCheckbox[len - 1].checked = false;
			}else {
				//这个input没被选中，执行选中操作，
				if (temp == len - 1) {
					//除了这个input和全选其他input都选了
					arrCheckbox[len - 1].checked = true;
				}
			}
		}
		//pushstate
		var regionNum = domFir.querySelectorAll("input[type = 'checkbox']:checked"),//注意这个还可能包括全选按钮
			productNum = domSec.querySelectorAll("input[type = 'checkbox']:checked"),
			rd = 0,
			rn = 0,
			rb = 0,
			ps = 0,
			pb = 0,
			pz = 0,
			rall = 0,
			pall = 0;
		//设置pushstate
		len = regionNum.length;
		for (i = 0;i < len;i++) {
			switch (regionNum[i].value) {
				case '华东':
					rd = 1;
					break;
				case '华南':
					rn = 1;
					break;
				case '华北':
					rb = 1;
					break;
				case '全选':
					rall = 1;
					break;
				default:
					console.log('error');
					break;
			}
		}
		len = productNum.length;
		for (i = 0;i < len;i++) {
			switch (productNum[i].value) {
				case '手机':
					ps = 1;
					break;
				case '笔记本':
					pb = 1;
					break;
				case '智能音箱':
					pz = 1;
					break;
				case '全选':
					pall = 1;
					break;
				default:
					console.log('error');
					break;
			}
		}
		var obj = {};
		obj.rd = rd;
		obj.rn = rn;
		obj.rb = rb;
		obj.ps = ps;
		obj.pb = pb;
		obj.pz = pz;
		obj.rall = rall;
		obj.pall = pall;
		history.pushState(obj,'',location.href.split('?')[0] + '?rd=' + obj.rd + '&rn=' + obj.rn + '&rb=' + obj.rb +'&rall=' + obj.rall + '&ps='+ obj.ps + '&pb=' + obj.pb + '&pz=' + obj.pz + '&pall=' + obj.pall);
		console.log(obj);
	}
}
