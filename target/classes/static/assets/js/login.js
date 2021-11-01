app = angular.module("login",["ngRoute"]);

app.config(function ($routeProvider){
	$routeProvider
	.when("/product", {
		templateUrl: "/assets/admin/product/index.html",
		controller: "product-ctrl"
	})
	.when("/authorize", {
		templateUrl:"/assets/admin/authority/index.html",
		controller: "authority-ctrl"
	})
	.when("/unauthorized", {
		templateUrl:"/assets/admin/authority/unauthorized.html",
		controller: "authority-ctrl"
	})
	.when("/category", {
            templateUrl: "/assets/admin/category/category.html",
            controller: "cate-ctrl"
        })
        .when("/home", {
            templateUrl: "/assets/admin/home/home.html",
            controller: "home-ctrl"
        })
	.otherwise({
		template:"<h1 class='text-center'>FPT Polytechnic Administration </h1>"
	})
})