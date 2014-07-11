'use strict';

/* Controllers */
var cbmAppControllers = angular.module('cbmAppControllers', []);

cbmAppControllers.controller('MealListCtrl', ['$scope', '$http',
	function($scope, $http) {
	$http.get('data/meals.json').success(function(data) {
		$scope.meals = data;
	});

	$scope.siteName = "Chicken Breast Meals.com";
	$scope.orderProp = 'cooktime';
}]);