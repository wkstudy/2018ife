class Canteen {
	constructor(money,seatNumber,staffList) {
		this.money = money;
		this.seatNumber  = seatNumber;
		this.staffList = staffList;
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
	constructor(id,name,pages) {
		super(id,name,pages);
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
	}
	serveFood(foodArg,customerId) {
		//上菜
		console.log('上了' + foodArg.name + '菜');
	}	
}
class Chief extends Staff {
	constructor(id,name,pages) {
		super(id,name,pages);
	}
	work(foodArg) {
		//做菜
		console.log('正在做' + foodArg.name)
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

var ifeRestaurant = new Canteen(1000000,20,[]);

var newCook = new Chief(1001,"Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staffList[0].id);


ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staffList);
