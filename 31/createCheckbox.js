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
	//事件委托
	
	id.addEventListener('click', function (e) {
		if (e.target.nodeName.toLowerCase() == 'input') {
			var arrCheckbox = id.querySelectorAll('input'),
				len = arrCheckbox.length,
				temp = 0 ;//记录除了全选以外的按钮被选中的个数
			if (e.target.getAttribute('check-type') == 'all') {
				//全选
				if (!(e.target.checked)) {
					//取消选中 ->全部取消
					for (i = 0;i < len -1; i++) {
						arrCheckbox[i].checked = false;
					}
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
					//执行 取消选中操作
					if (temp == 0) {
						e.preventDefault();
					}
					arrCheckbox[len - 1].checked = false;
				}else {
					//执行选中操作
					if (temp == len - 1) {
						arrCheckbox[len - 1].checked = true;
					}
				}
			}
		}
	}, false)
	
}