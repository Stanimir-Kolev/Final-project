var app = angular.module("homeController", []);
app.controller("bookController", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {
    // show all books api
    $scope.getBooks = function() {
            $http.get("/books").then(function(response) {
                $scope.books = response.data;
                $scope.text = "";
            })
        }
        //show one book api
    $scope.getBook = function() {
            var id = $routeParams.id;
            $http.get("/books/" + id).then(function(response) {
                $scope.book = response.data;
            })
        }
        //edit book api
    $scope.editBook = function() {
            var id = $routeParams.id;
            $http.post("/books/" + id).then(function(response) {
                $scope.book = response.data;
            })
        }
        // add book in user collection 
    $scope.addBook = function() {
        // trqbva da peoproverq dali q ima vuv data bazata
        if ($scope.newBook == null) {
            throw new Error("object is null");
        } else {
            $http.post("/books", $scope.newBook).then(function(response) {
                setTimeout(function() {
                    $scope.newBook = null;
                }, 1000);
            })
        }
    }
}]);