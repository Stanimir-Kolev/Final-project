var app = angular.module("stillreadCollectionBook", []);
app.controller("stillReadBookController", ["Auth", "$scope", "$http", "$location", "$routeParams", function(Auth, $scope, $http, $location, $routeParams) {
    // show stillreadbooks collection api
    $scope.getStillReadBooks = function() {
            $http.get("/stillreadbooks").then(function(response) {
                $scope.stillReadBooks = response.data;
                Auth.getUser().then(function(response) {
                    var currentUserObject = response.data;

                    $scope.stillReadBooks = $scope.stillReadBooks.filter(x => x.author.id == currentUserObject.id)


                    if ($scope.stillReadBooks.length == 0) {
                        $scope.length = 0;
                    } else {
                        $scope.length = $scope.stillReadBooks.length;
                    }

                })
            })
        }
        //show current User All stillreadbooks
    $scope.getStillReadBooksCurrentUser = function() {
        Auth.getUser().then(function(response) {
            var currentUserObject = response.data;
            $http.get("/stillreadbooks").then(function(response) {
                $scope.stillReadBooks = response.data.filter(x => x.author.id == currentUserObject.id)
            })
        })
    }

    // add stillreadbooks from current user in read collection 
    $scope.addStillReadBook = function() {
        Auth.getUser().then(function(response) {
            var currentUserObject = response.data;
            var id = $routeParams.id;
            $http.get("/books/" + id).then(function(response) {
                var currentBookObject = response.data;
                $http.get("/stillreadbooks").then(function(response) {
                    var someStillReadBook = response.data.some(x => (x.book._id == id) && (x.author.id == currentUserObject.id))
                    if (someStillReadBook) {
                        throw new Error("knigata q ima");
                    } else {
                        var newStillReadBook = {
                            author: currentUserObject,
                            book: currentBookObject,
                            date: new Date().toLocaleString()
                        }
                        $http.post("/stillreadbooks", newStillReadBook).then(function(response) {})
                    }
                })
            })
        })
    }
    $scope.deleteStillReadBook = function(id) {
        $http.delete("/stillreadbooks/" + id).then(function(response) {
            $scope.getStillReadBooksCurrentUser();
        })
    }
}]);