var app = angular.module("favCollectionBook", []);
app.controller("favBookController", ["Auth", "$scope", "$http", "$location", "$routeParams", function (Auth, $scope, $http, $location, $routeParams) {
    // show favbooks collection api

    $scope.getFavBooks = function () {
        $http.get("/favbooks").then(function (response) {
            $scope.favBooks = response.data;
        })
    }
    //show current User All favbooks
    $scope.getFavBooksCurrentUser = function () {
        Auth.getUser().then(function (response) {
            var currentUserObject = response.data;
            $http.get("/favbooks").then(function (response) {
                $scope.favBooks = response.data.filter(x => x.author.id == currentUserObject.id)
            })
        })
    }
    // add favBook from current user in fav collection 
    $scope.addFavBook = function () {
        if (Auth.isLoggedIn()) {
            Auth.getUser().then(function (response) {
                var currentUserObject = response.data;
                var id = $routeParams.id;
                $http.get("/books/" + id).then(function (response) {
                    var currentBookObject = response.data;
                    $http.get("/favbooks").then(function (response) {
                        var someFavBook = response.data.some(x => (x.book._id == id) && (x.author.id == currentUserObject.id))
                        if (someFavBook) {
                            alert('This book is already in your favorite colletion!');
                        } else {
                            
                            var newFavBook = {
                                author: currentUserObject,
                                book: currentBookObject,
                                date: new Date().toLocaleString()
                            }

                            $http.post("/favbooks", newFavBook).then(function (response) { })
                        }
                    })
                })
            })

        }else{
            $location.path('/login');
        }
    }

    $scope.deleteFavBook = function (id) {
        $http.delete("/favbooks/" + id).then(function (response) {
            $scope.getFavBooksCurrentUser();
        })
    }

}]);