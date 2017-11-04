var starApp = angular.module('starApp', []);

starApp.controller('StarCtrl', ['$scope', "$http", function ($scope, $http) {
    $scope.setRating = function () {
        $http.get("/books").then(function (response) {
            $scope.books = response.data;
            $scope.text = "";
        })
    }
}])