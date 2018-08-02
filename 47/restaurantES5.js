//餐厅
function Canteen (money,seatNumber,staffList,trueOrFalse) {
	this.money = money;
	this.seatNumber  = seatNumber;
	this.staffList = staffList;
	this.empty = trueOrFalse;
}
Canteen.prototype.hire = function(staff){
	this.staffList.push(staff);
};
Canteen.prototype.fire = function(staffId) {
	for (var i = 0; i < this.staffList.length; i++) {
		if (this.staffList[i].id == staffId) {
			break;
		}
		if (i == this.staffList.length) {
			console.log('no this man');
		}else {
			this.staffList.splice(i, 1);
		}
	}
};

//职员
function Staff (id,name,pages) {
	this.id = id;
	this.name = name;
	this.pages = pages;
}
Staff.prototype.work = function(){
	console.log('staff work');
};
//服务员 单例
var waiterSingleton = (function() {
	var instance = null;

	//类  Waiter
	function Waiter (args) {
		var args = args || {};
		Staff.call(this, args.id,args.name,args.pages);
	}
	inheritPrototype(Waiter,Staff);
	Waiter.prototype.work = function(foodArg,customerId){
		if (foodArg instanceof Array) {
			this.record(foodArg,customerId);
		}else {
			this.serveFood(foodArg,customerId);//上菜
		}
	};
	Waiter.prototype.record = function(foodArg,customerId){
		//点菜
		for (var i = 0; i < foodArg.length; i++) {
			console.log('记录' + customerId + '点了' + foodArg[i].name)
		}
	};
	Waiter.prototype.serveFood = function(foodArg,customerId){
		//上菜
		console.log('上了' + foodArg.name + '菜给' + customerId)
	};

	//
	return {
		//类的名字
		name:'Waiter',
		getInstance:function (args) {
			if (instance === null) {
				instance = new Waiter(args);
			}
			return instance;
		}
	}
})();
var chiefSingleton = (function() {
	var instance = null;
	//类 chief
	function Chief (args) {
		var args = args || {};
		Staff.call(this, args.id,args.name,args.pages);
	}
	inheritPrototype(Chief,Staff);
	Chief.prototype.work = function(foodArg,customerId){
		//做菜
		console.log('正在给' + customerId + '做' + foodArg.name)
	};
	//
	return {
		name :'Chief',
		getInstance: function(args) {
			if (instance === null) {
				instance = new Chief(args);
			}
			return instance;
		}
	}
})();
//顾客
function Customer (id) {
	this.id = id;
}
Customer.prototype.eat = function(foodArg) {
	//吃菜
	console.log('您吃了' + foodArg.name);
};
Customer.prototype.orderDishes = function(foodArg){
	//点菜(随机点多道菜)
	console.log('您点了' + foodArg.name);
};
//菜品
function Food (name,cost,price,time) {
	this.name = name;
	this.cost = cost;
	this.price = price;
	this.time = time;
}

//寄生组合式继承
function inheritPrototype (subType,superType) {
	var prototype = Object.create(superType.prototype);//建立副本(书上的是object(superType.prototype),object()方法是ES5前Object.create()的非规范化实现),参考的是[网址](https://blog.csdn.net/u010582082/article/details/71616913),我还书上写错了
	prototype.constructor = subType;//为副本建立constructor，弥补因重写原型而失去的默认的constructor属性
	subType.prototype = prototype;//副本赋给子类原型
}
//菜单
var menu = [],
	foodname = ['热干面','五谷鱼粉','盖饭','豆皮','烫饭','削面','玉米','麻辣烫','烤鱼'],
	i,
	len = foodname.length;
for (i = 0;i < len;i++) {
	var cost = (Math.random() + 0.5) * 10,
		price = (Math.random() + 1) * 10,
		time = Math.floor(Math.random() * 10 + 1),//1-10
		food = new Food(foodname[i],cost,price,time);
	menu.push(food);
}

//随机点菜
function randomOrderDishes (customer,menu) {
	var i,
		len = menu.length,
		k = 0,
		number = Math.floor(Math.random() * len + 1),//循环（1-len）次
		flag = [];
	for (i = 0;i < len;i++) {
		flag[i] = true;
	}
	for (i = 0;i < number;i++) {
		temp = Math.floor(Math.random() * len);//0 - (len - 1);
		for (i = 0 ;i < len;i++) {
			if (flag[i] == false) {
				k++;//判断是否都点过了
			}
		}
		while (flag[temp] == false && k!= len) {
			temp = (temp + 1) % len;
		}
		if (flag[temp] == true) {
			customer.orderDishes(menu[temp]);
			falg[temp] = false;
		}
	}
}