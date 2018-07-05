createCheckbox(document.getElementById('region-radio-wrapper'),['华东','华南','华北'],'region');
createCheckbox(document.getElementById('product-radio-wrapper'),['手机','笔记本','智能音箱'],'product');
document.getElementById('product-radio-wrapper').addEventListener('click', function(e){
	if (e.target.nodeName.toLowerCase() == 'input') {
		createTable(document.getElementById('region-radio-wrapper'),this,sourceData);//生成table
	}
}, false)
document.getElementById('region-radio-wrapper').addEventListener('click', function(e) {
	if (e.target.nodeName.toLowerCase() == 'input') {
		createTable(this,document.getElementById('product-radio-wrapper'),sourceData);//生成table
	}
}, false)
