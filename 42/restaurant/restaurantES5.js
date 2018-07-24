//餐厅
function Canteen (money,seatNumber,staffList) {
	this.money = money;
	this.seatNumber  = seatNumber;
	this.staffList = staffList;
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
//服务员
function Waiter (id,name,pages) {
	Staff.call(this, id,name,pages);
}
Waiter.prototype = Staff.prototype;
Waiter.prototype.constructor = Waiter;
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
	
	}
};
Waiter.prototype.serveFood = function(foodArg,customerId){
	//上菜
	console.log('上了' + foodArg.name + '菜')
};
//厨师
function Chief (id,name,pages) {
	Staff.call(this, id,name,pages);
}
Chief.prototype = Staff.prototype;
Chief.prototype.constructor = Chief;
Chief.prototype.work = function(foodArg){
	//做菜
	console.log('正在做' + foodArg.name)
};

function Customer (id) {
	this.id = id;
}
Customer.prototype.eat = function(foodArg) {
	//吃菜
	console.log('您吃了' + foodArg.name);
};
Customer.prototype.orderDishes = function(foodArg){
	//点菜
	console.log('您点了' + foodArg.name);
};
//菜品
function Food (name,cost,price) {
	this.name = name;
	this.cost = cost;
	this.price = price;
}

var ifeRestaurant = new Canteen(1000000,20,[]);

var newCook = new Chief(1001,"Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staffList);


ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staffList);