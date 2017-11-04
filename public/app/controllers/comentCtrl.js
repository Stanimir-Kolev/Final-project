var app = angular.module("detailsController", []);
app.controller("comentController", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {
    $scope.getComents = function() {
        var id = $routeParams.id;
        $http.get("/coments/"+id).then(function(response) {
            $scope.coments = response.data;
            // console.log($scope.coments.filter(x=>x.bookId == id))
        })
    }
    $scope.getComent = function() {
        var id = $routeParams.id;
        $http.get("/coments/" + id).then(function(response) {
            $scope.coment = response.data;
        })
    }
    // $scope.editBook = function() {
    //     var id = $routeParams.id;
    //     $http.post("/books/" + id).then(function(response) {
    //         $scope.book = response.data;
    //     })
    // }
}]);