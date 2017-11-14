var app = angular.module("detailsController", ['authServices']);
app.controller("comentController", ["Auth", "$scope", "$http", "$location", "$routeParams", function(Auth, $scope, $http, $location, $routeParams) {
    //show all coments
    $scope.getComents = function() {
        $http.get("/coments").then(function(response) {
            var currentBookId = $routeParams.id;
            $scope.coments = response.data.filter(x => x.bookId == currentBookId);
            if (Auth.isLoggedIn()) {
                Auth.getUser().then(function(response) {
                    var userObject = response.data;
                    $scope.comentsFromUser
                })
            }
        })
    }

    //show current User All comments
    $scope.getComentFromCurrentUser = function() {
        Auth.getUser().then(function(response) {
            var currentUserObject = response.data;
            $http.get("/coments").then(function(response) {
                $scope.coments = response.data.filter(x => x.author.id == currentUserObject.id)
            })
        })
    }
    $scope.addComent = function() {
        var currentBookId = $routeParams.id;
        var textFromInput = document.querySelector("#comentar").value;
        if (Auth.isLoggedIn()) {
            Auth.getUser().then(function(response) {
                var userObject = response.data;
                function Coment(author, bookId, text) {
                    this.author = author;
                    this.bookId = bookId;

                    function validString(inputText) {
                        if (inputText.length > 0)
                            return !(/[\\/&;]/.test(inputText));
                        else throw new Error("Must write first");
                    }
                    if (validString(text))
                        this.text = text;

                    this.date = new Date();
                    this.likes = {
                        like: 0,
                        userId: []
                    }
                }
                $scope.coment = new Coment(userObject, currentBookId, textFromInput);
                $http.post("/coments", $scope.coment).then(function(response) {
                    $scope.getComents();
                })
            })
        } else {
            $location.path('/login');
        }
        setTimeout(function() {
            textFromInput = document.querySelector("#comentar").value = "";
        }, 1000);
    }
    $scope.deleteComent = function(id) {
            $http.delete("/coments/" + id).then(function(response) {
                $scope.getComentFromCurrentUser();
            })
        }
        // za like-ovete
    $scope.editComent = function(id) {
        $http.get("/coments/" + id).then(function(response) {
            $scope.coment = response.data;
            
            if (Auth.isLoggedIn()) {
                Auth.getUser().then(function(response) {
                    var userObject = response.data;
                    if ($scope.coment.likes.userId.find(id=>id == userObject.id)){
                        throw new Error("Veche si haresal")
                    }else{
                        $scope.coment.likes.userId.push(userObject.id);
                        $scope.coment.likes.like++;
                        $http.put("/coments/" + id, $scope.coment).then(function(response) {
                            $scope.getComents();
                        })
                    }                    
                })}
        })
    }
}]);