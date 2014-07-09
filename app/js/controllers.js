'use strict';

/* Controllers */
var cbmApp = angular.module('cbmApp', []);

cbmApp.controller('MealListCtrl', function($scope, $http) {
	$http.get('data/meals.json').success(function(data) {
		$scope.meals = data;
	});

	$scope.name = "Chicken Breast Meals.com"; 
	$scope.orderProp = 'cooktime';
});