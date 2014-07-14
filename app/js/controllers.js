'use strict';

/* Controllers */
var cbmAppControllers = angular.module('cbmAppControllers', []);

cbmAppControllers.controller('MealListCtrl', ['$scope', '$http',
	function($scope, $http) {
	$http.get('data/meals.json').success(function(data) {
		$scope.meals = data;
	});

	$scope.viewMealDetail = function(id) {
		$http.get('data/' + id + '.json').success(function(data) {
			$scope.mealDetail = data;
		}).error(function(data, status, headers, config) { 
			alert("Error loading recipe." + data);
		});
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