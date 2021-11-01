app.controller("home-ctrl", function($scope, $http) {
    $scope.items = [];
    $scope.cates = [];
    $scope.form = {};

    $scope.initialize = function() {
        //load categories
        $http.get("/rest/categories").then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.createDate = new Date(item.createDate)
            })
        });

        //load categories
        $http.get("/rest/categories").then(resp => {
            $scope.cates = resp.data;
        });
    }

    $scope.initialize();

    // Xóa form
    $scope.reset = function() {
        $scope.form = {
            createDate: new Date(), // ngày mặc định
            image: "logo.png", // ảnh mắc định
            available: true,
        };
    }

    // HIEN THI LEN FORM
    $scope.edit = function(item) {
        $scope.form = angular.copy(item);
        $(".nav-tabs a:eq(0)").tab('show')
    }

    // thêm mới sp
    $scope.create = function() {
        var item = angular.copy($scope.form);
        var name = document.myform.name.value;
        var status = false;
        if (name.length < 1) {
            document.getElementById("name").innerHTML =
                " Please enter your name";
            status = false;
        } else {
            document.getElementById("name").innerHTML =
                " ";
            status = true;
        }
        $http.post(`/rest/categories`, item).then(resp => {
            $scope.items.push(resp.data);
            $scope.reset();
            $scope.initialize();
            alert("Thêm mới sản phẩm thành công!");
        }).catch(error => {
            alert("Thất bại!", "Lỗi thêm mới", "error");
            console.log("Error", error);
        })
    }


    // update
    $scope.update = function() {
        var item = angular.copy($scope.form);
        $http.put(`/rest/categories/${item.id}`, item).then(resp => {
            var index = $scope.items.findIndex(p => p.id == item.id);
            $scope.items[index] = item;
            alert("Thành công!", "Thông tin sản phẩm đã được cập nhật!", "success");
        }).catch(error => {
            alert("Thất bại!", "Lỗi cập nhật thông tin", "error");
            console.log("Error", error);
        });
    }

    // delete
    $scope.delete = function(item) {
        //Day len server bang Put
	$http.delete(`/rest/categories/${item.id}`).then(resp => {
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

    $scope.pager = {
        page: 0,
        size: 5,
        get items() {
            var start = this.page * this.size;
            return $scope.items.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.items.length / this.size);
        },
        first() {
            this.page = 0;
        },
        prev() {
            this.page--;
            if (this.page < 0) {
                this.last();
            }
        },
        next() {
            this.page++;
            if (this.page >= this.count) {
                this.first();
            }
        },
        last() {
            this.page = this.count - 1;
        }
    }
});