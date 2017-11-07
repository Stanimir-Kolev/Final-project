var app = angular.module("readCollectionBook", []);
app.controller("readBookController", ["Auth", "$scope", "$http", "$location", "$routeParams", function (Auth, $scope, $http, $location, $routeParams) {
    // show readbooks collection api
    $scope.getReadBooks = function () {
        $http.get("/readbooks").then(function (response) {
            $scope.readBooks = response.data;
            if (Auth.isLoggedIn()) {
                Auth.getUser().then(function (response) {
                    var currentUserObject = response.data;
                    $scope.readBooks = $scope.readBooks.filter(x => x.author.id == currentUserObject.id)
                    if ($scope.readBooks.length == 0) {
                        $scope.length = 0;
                    } else {
                        $scope.length = $scope.readBooks.length;
                    }
                })
            }
        })

    }
    //show current User All readbooks
    $scope.getReadBooksCurrentUser = function () {
        Auth.getUser().then(function (response) {
            var currentUserObject = response.data;
            $http.get("/readbooks").then(function (response) {
                $scope.readBooks = response.data.filter(x => x.author.id == currentUserObject.id)
            })
        })
    }

    // add readbooks from current user in read collection 
    $scope.addReadBook = function () {
        if (Auth.isLoggedIn()) {
            Auth.getUser().then(function (response) {
                var currentUserObject = response.data;
                var id = $routeParams.id;
                $http.get("/books/" + id).then(function (response) {
                    var currentBookObject = response.data;
                    $http.get("/readbooks").then(function (response) {
                        var someReadBook = response.data.some(x => (x.book._id == id) && (x.author.id == currentUserObject.id))
                        if (someReadBook) {
                            alert('This book is already in your books have been read colletion!');
                        } else {
                            var newReadBook = {
                                author: currentUserObject,
                                book: currentBookObject,
                                date: new Date().toLocaleString()
                            }
                            $http.post("/readbooks", newReadBook).then(function (response) { })
                        }
                    })
                })
            })
        } else {
            $location.path('/login');
        }
    }
    $scope.deleteReadBook = function (id) {
        $http.delete("/readbooks/" + id).then(function (response) {
            $scope.getReadBooksCurrentUser();
        })
    }
}]);