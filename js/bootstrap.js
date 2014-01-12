var app = angular.module('wis', ["ngRoute"]);

app.config(function($routeProvider, $sceProvider, $locationProvider) {

	$routeProvider.when('/', {
		templateUrl: 'views/search.html',
		controller: "SearchCtrl",
		controllerAs: 'Search'
	});

	$routeProvider.when('/:category/:feature', {
		templateUrl: 'views/feature.html',
		controller: "FeatureCtrl",
		controllerAs: 'Feature'
	});

	$sceProvider.enabled(false);
});


app.controller('SearchCtrl', ["$http", "$location", function($http, $location) {
	var Search = this;

	$http.get("json/categories.json").then(function(result) {
		Search.categories = result.data;
	});

}]);

app.controller('MainCtrl', ["$http", "$location", function($http, $location) {
	var Search = this;
}]);

app.controller('FeatureCtrl', ["$http", "$routeParams", function($http, $routeParams) {
	var Feature = this;

	Feature.params = $routeParams;

	Feature.classname = function(row, col, x, y) {
		if(angular.isNumber(col)){
			return (col ? "success":"danger") + " support text-hide"
		}
		if(col === null){
			return "unknown"
		}
		return "success"
	};

	$http.get("json/" + $routeParams.category + "/" + $routeParams.feature + ".json").then(function(result) {
		Feature.json = result.data;
	});

}]);


app.filter('link', function() {
	return function(link){
		return link.toLowerCase().replace(/ /g, "-")
	};
});


app.directive('markdown', function () {
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
        scope: {html:"=markdown", extra: "=mdExtra"},
        link: function (scope, element, attrs){
        	var htmlText = (scope.html === null) ? "" : converter.makeHtml(scope.html+"\n"+scope.extra.join("\n"));
            element.html(htmlText);
        }
    };
});