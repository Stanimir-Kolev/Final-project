var app = angular.module("toreadCollectionBook", []);
app.controller("toReadBookController", ["Auth", "$scope", "$http", "$location", "$routeParams", function(Auth, $scope, $http, $location, $routeParams) {
    // show stillreadbooks collection api
    $scope.getToReadBooks = function() {
            $http.get("/toreadbooks").then(function(response) {
                $scope.toReadBooks = response.data;
            })
        }
        //show current User All stillreadbooks
    $scope.getToReadBooksCurrentUser = function() {
        Auth.getUser().then(function(response) {
            var currentUserObject = response.data;
            $http.get("/toreadbooks").then(function(response) {
                $scope.toReadBooks = response.data.filter(x => x.author.id == currentUserObject.id)
            })
        })
    }

    // add stillreadbooks from current user in read collection 
    $scope.addToReadBook = function() {
        Auth.getUser().then(function(response) {
            var currentUserObject = response.data;
            var id = $routeParams.id;
            $http.get("/books/" + id).then(function(response) {
                var currentBookObject = response.data;
                $http.get("/toreadbooks").then(function(response) {
                    var someToReadBook = response.data.some(x => (x.book._id == id) && (x.author.id == currentUserObject.id))
                    if (someToReadBook) {
                        throw new Error("knigata q ima");
                    } else {
                        var newToReadBook = {
                            author: currentUserObject,
                            book: currentBookObject,
                            date: new Date().toLocaleString()
                        }
                        $http.post("/toreadbooks", newToReadBook).then(function(response) {})
                    }
                })
            })
        })
    }
    $scope.deleteToReadBook = function(id) {
        $http.delete("/toreadbooks/" + id).then(function(response) {
            $scope.getToReadBooksCurrentUser();
        })
    }
}]);