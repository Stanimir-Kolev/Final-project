var app = angular.module("homeController", []);
app.controller("bookController", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {
    $scope.getBooks = function() {
        $http.get("/books").then(function(response) {
            $scope.books = response.data;
            $scope.text = "";
        })
    }
    $scope.getBook = function() {
        var id = $routeParams.id;
        $http.get("/books/" + id).then(function(response) {
            $scope.book = response.data;

            console.log(response.data.comments)
        })
    }
    $scope.editBook = function() {
        var id = $routeParams.id;
        $http.post("/books/" + id).then(function(response) {
            $scope.book = response.data;
        })
    }
}]);
