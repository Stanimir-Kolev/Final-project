var app = angular.module("collectionBookController", []);
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
        // trqbva da peoproverq dali q ima vuv data bazata
        Auth.getUser().then(function (response) {
            var currentUserObject = response.data;
            var id = $routeParams.id;

            $http.get("/books/" + id).then(function (response) {
                var currentBookObject = response.data;
                var newFavBook = {
                    author: currentUserObject,
                    book: currentBookObject,
                    date: new Date().toLocaleString()
                }
                $http.get("/favbooks").then(function (response) {
                    var sameFavBook = response.data.some(x => ((x.book.id == id) && (x.author.id == currentUserObject.id)));
                    if (sameFavBook) {
                        throw new Error("knigata q ima");
                    } else {
                        $http.post("/favbooks", newFavBook).then(function (response) { })
                    }
                })
            })
        })
    }
    $scope.deleteFavBook = function (id) {
        $http.delete("/favbooks/" + id).then(function (response) {
            $scope.getFavBooksCurrentUser();
        })
    }
}]);