var app = angular.module("detailsController", ['authServices']);
app.controller("comentController", ["Auth", "$scope", "$http", "$location", "$routeParams", function(Auth, $scope, $http, $location, $routeParams) {
    //show all coments
    $scope.getComents = function() {
        $http.get("/coments").then(function(response) {
            var currentBookId = $routeParams.id;
            $scope.coments = response.data.filter(x => x.bookId == currentBookId);

            Auth.getUser().then(function(response) {
                var userObject = response.data;
                $scope.comentsFromUser
            })
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
        // $scope.getComent = function() {
        //     var id = $routeParams.id;
        //     $http.get("/coments/" + id).then(function(response) {
        //         $scope.coment = response.data;
        //     })
        // }
    $scope.addComent = function() {
        var currentBookId = $routeParams.id;
        var textFromInput = document.querySelector("#comentar").value;
        Auth.getUser().then(function(response) {
            var userObject = response.data;

            function Coment(author, bookId, text, rating) {
                this.author = author;
                this.bookId = bookId;

                function validString(input) {
                    if (input.length > 0)
                        return !(/[\\/&;]/.test(input));
                    else throw new Error("Must write first");
                }
                if (validString(text))
                    this.text = text;

                this.date = new Date().toLocaleString("en-GB");
                this.rating = null
            }
            $scope.coment = new Coment(userObject, currentBookId, textFromInput);
            $http.post("/coments", $scope.coment).then(function(response) {
                $scope.getComents();
            })
        })
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
        // proverka dali e minala uspeshno zaqvkata ako da da ne pravi poveche put zaqvki
        $http.get("/coments/" + id).then(function(response) {
            $scope.coment = response.data;
            $scope.coment.likes++;
            $http.put("/coments/" + id, $scope.coment).then(function(response) {
                $scope.getComents();
                // $scope.coments.push($scope.coment);
            })
        })
    }
}]);