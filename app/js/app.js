'use strict';


// Declare app level module which depends on filters, and services
angular.module('cbmApp', [
  'ngRoute',
  'cbmAppControllers'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/index', {templateUrl: 'partials/meal-list.html', controller: 'MealListCtrl'});
  	$routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'MealListCtrl'});
  	$routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'MealListCtrl'});
  	$routeProvider.when('/tools', {templateUrl: 'partials/tools.html', controller: 'MealListCtrl'});
}]);