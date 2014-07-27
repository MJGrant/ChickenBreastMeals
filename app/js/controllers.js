'use strict';

/* Controllers */
var cbmAppControllers = angular.module('cbmAppControllers', []);

cbmAppControllers.controller('MasterCtrl', function($scope, $http) {
	$scope.getMeals = function() {
		$http.get('/api/db').success(function(data) {
			$scope.meals = data;
		})
		.error(function(data) {
			console.log("getMeals Error: " + data);
		});
	};

	$scope.createNewMeal = function(newMeal) {
		$http.post('/api/db',newMeal)
		.success(function(data) {
			$scope.meals = data;
			console.log("post success: " + data.title);
		})
		.error(function(data) {
			console.log("error");
		});
	};
});

cbmAppControllers.controller('AdminCtrl', ['$scope', function($scope) {
	$scope.test = 'test';
	$scope.postMeal = function() {
		$scope.createNewMeal($scope.mealDetail);
	};
}]);

cbmAppControllers.controller('MealListCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.getMeals();
	$scope.viewMealDetail = function(id) {
		$http.get('data/' + id + '.json').success(function(data) {
			$scope.mealDetail = data;
		}).error(function(data, status, headers, config) {
			alert("Error loading recipe." + data);
		});
	};

	$scope.selectThisMeal = function(id) {
		$scope.meals.forEach(function(mealIndex) {
			mealIndex.selected=false;
		});
		$scope.meals[id].selected=true;
	};

	$scope.siteName = "Chicken Breast Meals.com";
	$scope.orderProp = 'cooktime';
}]);

cbmAppControllers.controller('DetailsController', ['$scope', function($scope) {
	$scope.templates =
	[ {name: 'partials/meal-detail.html', url: 'partials/meal-detail.html'},
	{ name: 'partials/test1.html', url: 'partials/test1.html'} ];
	$scope.template = $scope.templates[0];
}]);


cbmAppControllers.controller('MealDetailsCtrl', ['$scope', '$routeParams', '$http',
	function($scope, $routeParams, $http) { }
]);
