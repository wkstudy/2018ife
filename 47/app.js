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
//添加一个服务员、一个厨师
chiefSingleton.getInstance(argsChief);
waiterSingleton.getInstance(argsWaiter);
fandian.hire(chiefSingleton.getInstance());
fandian.hire(waiterSingleton.getInstance());
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
	waiterSingleton.getInstance().work([menu[eatFood]],customer.id);
	chiefSingleton.getInstance().work(menu[eatFood],customer.id);
	waiterSingleton.getInstance().work(menu[eatFood],customer.id);
	customer.eat(menu[eatFood]);
	fandian.empty = true;
}