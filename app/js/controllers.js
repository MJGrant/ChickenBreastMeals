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

	$scope.editMeal = function(existingMeal) {
		$http.put('/api/db/' + existingMeal._id, existingMeal)
			.success(function(data) {
				$scope.meals = data;
				console.log("Edited meal: " + data.title);
			})
			.error(function(data) {
				console.log("error:" + data);
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
			});
		};
});

cbmAppControllers.directive("fileread", [function() {
    return {
        scope: {
            fileread: "="
        },
        link: function(scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                });
            });
        }
    }
}]);

cbmAppControllers.controller('AdminCtrl', ['$scope', function($scope) {
	$scope.creatingNewMeal = false;
	console.log("initializing creatingNewMeal variable: ", $scope.creatingNewMeal);
	$scope.postMeal = function(mealDetail) {
		if ($scope.creatingNewMeal === false) {
			console.log("$scope.creatingNewMeal is expected FALSE. Is: " + $scope.creatingNewMeal);
			$scope.editMeal(mealDetail); //we're editing an existing, so just edit that meal
		} else { //we're making (posting) a brand new meal
			console.log("$scope.creatingNewMeal = ", $scope.creatingNewMeal);
			mealDetail.mealOptions = {
				dairyfree:false,
				glutenfree:false,
				lowcarb:false,
                lowfat:false,
                paleo:false,
                quick:false
			};
			$scope.mealDetail.ingredients = [];
			$scope.mealDetail.instructions = [];
            $scope.mealDetail.images = [];
			//todo: add blank arrays and objects when creating a new meal
			$scope.createNewMeal(mealDetail);
			$scope.creatingNewMeal = false; //we're no longer creating a new meal, because it now exists
		}
	};

	$scope.deleteMeal = function(mealDetail) {
		console.log("DELETED!");
		$scope.deleteExistingMeal(mealDetail);
		$scope.getMeals();
	};

	$scope.viewMealDetail = function(meal) {
        console.log("Calling viewMealDetail " + meal.title);
        $scope.mealDetail = $scope.meals[$scope.meals.indexOf(meal)];
        console.log("$scope.creatingNewMeal is expected false: ", $scope.creatingNewMeal);
	};

	$scope.selectCreateNewMeal = function() {
		$scope.mealDetail = {}; //sets everything in the form to empty
		$scope.creatingNewMeal = true;
		console.log("Clicked 'create new meal' in list, set creatingNewMeal to true. Confirm: ", $scope.creatingNewMeal);
	};

	$scope.selectThisMeal = function(meal) {
		$scope.meals.forEach(function(mealIndex) {
			mealIndex.selected=false;
		});
		$scope.meals[$scope.meals.indexOf(meal)].selected=true;
	};

	$scope.siteName = "Chicken Breast Meals.com";
	$scope.orderProp = 'cooktime';
}]);

cbmAppControllers.controller('MealListCtrl', ['$scope', '$http', function($scope, $http) {
    /*$scope.filterByOption = {
        glutenfree:undefined
        }; */


    $scope.filterMeals = function(query, filterByOption) {
       console.log("Showing meals that meet this criteria: " + query + "or" + filterByOption);
        return function(meal) {
            if (meal.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                return true;
            } else if (!filterByOption.glutenfree) {
                return true;
            } else if (filterByOption.glutenfree && meal.mealOptions.glutenfree) {
                return true;
            } else {
                return false;
            }
        };
    };

        /*
    $scope.toggleOption = function(toggleMe) {
        if (toggleMe) {
            toggleMe = undefined;
        } else {
            toggleMe = true;
        }
        return toggleMe;
    };
*/

	$scope.getMeals();
	$scope.viewMealDetail = function(meal) {
		console.log("Viewing meal detail");
		$scope.mealDetail = $scope.meals[$scope.meals.indexOf(meal)];
	};

	$scope.selectThisMeal = function(meal) {
		$scope.meals.forEach(function(mealIndex) {
			mealIndex.selected=false;
		});
		$scope.meals[$scope.meals.indexOf(meal)].selected=true;
	};

	$scope.siteName = "Chicken Breast Meals.com";
	$scope.orderProp = 'cooktime';
}]);
