var app = angular.module("homeController", []);
app.controller("bookController", ["Auth", "$scope", "$http", "$location", "$routeParams", function (Auth, $scope, $http, $location, $routeParams) {
    // show all books api
    $scope.getBooks = function () {
        $http.get("/books").then(function (response) {
            $scope.books = response.data;
            $scope.text = "";
        })
    }
    //show one book api
    $scope.getBook = function () {
        var id = $routeParams.id;
        $http.get("/books/" + id).then(function (response) {
            $scope.book = response.data;
            // get RATING

            var masWithStats = $scope.book.rating.ratingStat;


            if (masWithStats.length != 0) {
                $scope.oldRating = masWithStats.reduce((a, b) => a + b) / masWithStats.length;
            } else {
                $scope.oldRating = 1;
            }

            var usersIdMas = response.data.rating.userId;

            $scope.addUserRating = function (newRating) {

                masWithStats.push(newRating);
                if (Auth.isLoggedIn()) {
                    Auth.getUser().then(function (response) {
                        var currentUserObject = response.data;

                        if (usersIdMas.find(x => x == currentUserObject.id) == undefined) {
                            usersIdMas.push(currentUserObject.id);
                        } else {
                            alert('You have already rated this book!');
                        }
                        var newBook = {
                            title: $scope.book.title,
                            author: $scope.book.author,
                            genre: $scope.book.genre,
                            description: $scope.book.description,
                            publisher: $scope.book.publisher,
                            pages: $scope.book.pages,
                            img_url: $scope.book.img_url,
                            buy_url: $scope.book.buy_url,
                            comments: $scope.book.comments,
                            rating: {
                                userId: usersIdMas,
                                ratingStat: masWithStats
                            }
                        }
                        $http.put("/books/" + id, newBook).then(function (response) {
                            $scope.getBook();
                        });
                    })
                } else {
                    $location.path('/login');
                }
            }
        })
    }
    //edit book api
    $scope.editBook = function () {
        var id = $routeParams.id;
        $http.post("/books/" + id).then(function (response) {
            $scope.book = response.data;
        })
    }
    // add book in user collection 
    $scope.addBook = function () {
        // trqbva da peoproverq dali q ima vuv data bazata
        if ($scope.newBook == null) {
            throw new Error("object is null");
        } else {
            $http.post("/books", $scope.newBook).then(function (response) {
                setTimeout(function () {
                    $scope.newBook = null;
                }, 1000);
            })
        }
    }
}]);