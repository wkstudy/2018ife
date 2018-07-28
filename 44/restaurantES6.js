class Canteen {
	constructor(money,seatNumber,staffList,trueOrFalse) {
		this.money = money;
		this.seatNumber  = seatNumber;
		this.staffList = staffList;
		this.empty = trueOrFalse;
	}
	hire(staff) {
		this.staffList.push(staff);
	}
	fire(staffId) {
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
	}
}
class Staff {
	constructor(id,name,pages) {
		this.id = id;
		this.name = name;
		this.pages = pages;
	}
	work() {
		console.log('staff work');
	}
}
class Waiter extends Staff {
	constructor(args) {
		super(args.id,args.name,args.pages);
		// this.instance = null;//加不加这句都可以
	}
	work(foodArg,customerId) {
		if (foodArg instanceof Array) {
			this.record(foodArg,customerId);
		}else {
			this.serveFood(foodArg,customerId);
		}
	}
	record(foodArg,customerId) {
		//点菜
		for (var i = 0; i < foodArg.length; i++) {
			console.log('记录' + customerId + '点了' + foodArg[i].name)
		}
	}
	serveFood(foodArg,customerId) {
		//上菜
		console.log('上了' + foodArg.name + '菜给' + customerId)
	}	
	static getInstance(args) {
		if (!this.instance) {
			this.instance = new Waiter(args);
		}
		return this.instance;
	}
}
class Chief extends Staff {
	constructor(args) {
		super(args.id,args.name,args.pages);
	}
	work(foodArg,customerId) {
		//做菜
		console.log('正在给' + customerId + '做' + foodArg.name)
	}
	static getInstance(args) {
		if (!this.instance) {
			this.instance = new Chief(args);
		}
		return this.instance;
	}
}
class Customer {
	constructor(id) {
		this.id = id;
	}
	eat(foodArg) {
		//吃菜
		console.log('您吃了' + foodArg.name);
	}
	orderDishes(foodArg) {
		//点菜
		console.log('您点了' + foodArg.name);
	}
}
class Food {
	constructor(name,cost,price) {
		this.name = name;
		this.cost = cost;
		this.price = price;
	}
}
//验证单例是否成功
// var xiaoli = {
// 	id:1,
// 	name:'xiaoli',
// 	pages:500
// },
// 	xiaohong = {
// 		id:2,
// 		name:'xiaohong',
// 		pages:200
// 	}
// console.log(Waiter.getInstance(xiaohong) === Waiter.getInstance(xiaohong));
// console.log(Waiter.getInstance(xiaoli))
// console.log(Waiter.getInstance(xiaohong))

//实例化一个饭店
var argsWaiter = {
	id:001,
	name:'tom',
	pages:5000,
	empty :true
},
	argsChief = {
		id:002,
		name:'xiaofugui',
		pages:8000
	},
	fandian = new Canteen(200000,1,[],true);
var menu = [],
	foodname = ['热干面','五谷鱼粉','盖饭','豆皮','烫饭','削面'],
	i,
	len = foodname.length;
for (i = 0;i < len;i++) {
	var cost = (Math.random() + 0.5) * 10,
		price = (Math.random() + 1) * 10,
		food = new Food(foodname[i],cost,price);
	menu.push(food);
}
//添加一个服务员、一个厨师
Chief.getInstance(argsChief);
Waiter.getInstance(argsWaiter);
fandian.hire(Chief.getInstance());
fandian.hire(Waiter.getInstance());
//顾客队列
var customerQueue = [];
var xiaoli = new Customer(1),
	xiaohong = new Customer(2);
customerQueue.push(xiaoli);
customerQueue.push(xiaohong);
while (customerQueue.length != 0 && fandian.empty == true) {
	fandian.empty = false;
	var customer = customerQueue.shift(),//push()
		eatFood = parseInt(Math.random() * 6,10);
	customer.orderDishes(menu[eatFood]);
	Waiter.getInstance().work([menu[eatFood]],customer.id);
	Chief.getInstance().work(menu[eatFood],customer.id);
	Waiter.getInstance().work(menu[eatFood],customer.id);
	customer.eat(menu[eatFood]);
	fandian.empty = true;
}