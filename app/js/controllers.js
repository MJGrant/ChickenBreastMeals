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
			console.log("error: " + data);
		});
	};

	$scope.deleteExistingMeal = function(id) {
		$http.delete('/api/db/'+ id)
			.success(function(data) {
				$scope.meals = data;
				console.log("Successfully deleted a meal. " + data);
			})
			.error(function(data) {
				console.log("error: " + data);
			})
	}
});

cbmAppControllers.controller('AdminCtrl', ['$scope', function($scope) {
	$scope.test = 'test';
	$scope.postMeal = function(mealDetail) {
		console.log("mealDetail title: " + mealDetail.title);
		$scope.createNewMeal(mealDetail);
	};

	$scope.deleteMeal = function(mealDetail) {
		console.log("DELETED!");
		$scope.deleteExistingMeal(mealDetail);
	};
}]);

cbmAppControllers.controller('MealListCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.getMeals();
	$scope.viewMealDetail = function(index) {
		$scope.mealDetail = $scope.meals[index];
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

cbmAppControllers.controller('AdminMealListCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.getMeals();
	$scope.viewMealDetail = function(index) {
		console.log("Calling viewMealDetail " + index);
		$scope.mealDetail = $scope.meals[index];
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

cbmAppControllers.controller('MealListCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.getMeals();
	$scope.viewMealDetail = function(index) {
		$scope.mealDetail = $scope.meals[index];
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

