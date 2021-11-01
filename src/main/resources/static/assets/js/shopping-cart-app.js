	const app = angular.module("shopping-cart-app", []);


	app.controller("shopping-cart-ctrl", function($scope, $http){
		
	/*
	* Quan ly gio hang
	*/
	$scope.cart = {
	items: [],
	// Them san pham vao gio hang
	add(id){
	var item = this.items.find(item => item.id == id);
	if(item){
	item.qty++;
	this.saveToLocalStorage();
	}
	else{
	$http.get(`/rest/products/${id}`).then(resp => {
	resp.data.qty = 1;
	this.items.push(resp.data);
	this.saveToLocalStorage();
	})
	}
	},
	// Xóa sản phẩm khỏi giỏ hàng
	remove(id){
		var index = this.items.findIndex(item => item.id == id);
		this.items.splice(index, 1);
		this.saveToLocalStorage();
	},
	// Xoa sach cac mat hang trong gio
	clear(){
		this.items = []
		this.saveToLocalStorage();
	},
	// Tinh thanh tien cua 1 san pham
	atm_of(item){},
	// Tinh tòn so luong cac mat hang trong gio
	get count(){
		return this.items
		.map(item => item.qty)
		.reduce((total, qty) => total += qty, 0);		
	},
	//Tinh thanh tien cac mat hang trong gio
	get amount(){
		return this.items
		.map(item => item.qty * item.price)
		.reduce((total, qty) => total += qty, 0);	
		
	},
	// Luu gio hang vao local storage
	saveToLocalStorage(){
		var json = JSON.stringify(angular.copy(this.items));
		localStorage.setItem("cart",json);
	},
	// Doc gio hang tu local storage
	loadFormLocalStorage(){
		var json = localStorage.getItem("cart");
		this.items = json ? JSON.parse(json) : [];
	}
	}
	$scope.cart.loadFormLocalStorage();
	$scope.order={
		createDate: new Date(),
		address: "",
		account: {username: $("#username").text()},
		get orderDetails(){ 
			return $scope.cart.items.map(item =>{
				return {
					product: {id: item.id},
					price: item.price,
					quantity: item.qty
				}
			});
		},
		purchase(){
			var order = angular.copy(this);
			// Thuc hien dat hang
			$http.post("/rest/orders", order).then(resp => {
				alert("Đặt hàng thành công!");
				$scope.cart.clear();
				location.href = "/order/detail/" + resp.data.id;
			}).catch(error => {
				alert("Đặt hàng lỗi!")
				console.log(error)
			})
		}
	}
	})