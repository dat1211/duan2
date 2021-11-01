app.controller("product-ctrl", function($scope, $http){
$scope.items=[];
$scope.cates = [];
$scope.form={};

$scope.initialize = function(){
//load product
$http.get("/rest/products").then(resp => {
	$scope.items = resp.data;
	$scope.items.forEach(item => {
		item.createDate = new Date(item.createDate)
	})	
});

//load categorys
$http.get("/rest/categories").then(resp => {
	$scope.cates = resp.data;
		
});
}
// Khoi dau
$scope.initialize();

//Xoa form
$scope.reset = function(){
	$scope.form={
		createDate: new Date(),
		image:'cloud-upload.jpg',
		available: true,
	};
}

//Hien thi len form
$scope.edit = function(item){
	$scope.form = angular.copy(item);
	$(".nav-tabs a:eq(0)").tab('show')
	
}

//Them san pham moi
$scope.create = function(){
	//Tao moi san pham
	var item = angular.copy($scope.form);
	//Lay thong tin tu item sau do post
	$http.post(`/rest/products`, item).then(resp => {
		//server tra ve ngay` trong javascript
		resp.data.createDate = new Date(resp.data.createDate)
		//o vao trong list
		$scope.items.push(resp.data);
		$scope.reset();
		alert("Thêm mới sản phẩm thành công!");
	}).catch(error => {
		alert("Lỗi thêm mới sản phẩm");
		console.log("Error", error); 
	});
}

//Cap nhat san pham
$scope.update = function(){
		//lay du lieu trong form
	var item = angular.copy($scope.form);
	//Day len server bang Put
	$http.put(`/rest/products/${item.id}`, item).then(resp => {
		//Tim trong product co id ma server tra? ve
		var index = $scope.items.findIndex(p => p.id == item.id);
		//Thay lai
		$scope.items[index] = item;
		alert("Cập nhật sản phẩm thành công!");
	}).catch(error => {
		alert("Lỗi cập nhật sản phẩm");
		console.log("Error", error); 
	});
}

//Xoa san pham
$scope.delete = function(item){
	//Day len server bang Put
	$http.delete(`/rest/products/${item.id}`).then(resp => {
		//Tim trong product co id ma server tra? ve
		var index = $scope.items.findIndex(p => p.id == item.id);
		//Thay lai
		$scope.items.splice(index, 1);
		$scope.reset();
		alert("Xóa sản phẩm thành công!");
	}).catch(error => {
		alert("Lỗi xóa sản phẩm");
		console.log("Error", error); 
	});
}

//Tai hinh
$scope.imageChanged = function(files){
	var data = new FormData();
	data.append('file', files[0]);
	$http.post('/rest/upload/images', data, {
		transformRequest: angular.identity,
		headers:{'Content-Type': undefined}
	}).then(resp => {
		$scope.form.image = resp.data.name;
	}).catch(error => {
		alert("Lỗi upload hình ảnh");
		console.log("Error", error); 
	})
}
// {{pager.page + 1}} of {{pager.count}}
$scope.pager = {
	page: 0,
	size: 10,
	get items(){
		var start = this.page * this.size;
		return $scope.items.slice(start, start + this.size);
	},
	get count(){
		return Math.ceil(1.0 * $scope.items.length / this.size)
	},
	first(){
		this.page = 0;
		
	},
	prev(){
		this.page--;
		if(this.page <0 ){
			this.last();
		}
		
	},
	next(){
		this.page++;
		if(this.page >= this.count ){
			this.first();
		}
		
	},
	last(){
		this.page = this.count - 1;
		
	}
}

});