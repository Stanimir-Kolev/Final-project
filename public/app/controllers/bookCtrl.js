var app = angular.module("homeController", []);
app.controller("bookController", ["$scope", "$http", "$location", "$routeParams", function ($scope, $http, $location, $routeParams) {
    $scope.name = "";
    $http.get("/books").then(function (response) {
        $scope.books = response.data;
        $scope.text = "";
    })
}]);