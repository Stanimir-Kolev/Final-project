var app = angular.module("detailsController", ['authServices']);
app.controller("comentController", ["Auth", "$scope", "$http", "$location", "$routeParams", function(Auth, $scope, $http, $location, $routeParams) {

    $scope.getComents = function() {
            $http.get("/coments").then(function(response) {
                var currentBookId = $routeParams.id;
                $scope.coments = response.data.filter(x => x.bookId == currentBookId);

                // za like-ovete
                $scope.addLikesForComent = function() {

                    $(function() {
                        $scope.getLike = function() {
                            var input = $(this).siblings('.qty1');
                            input.val(parseFloat(input.val()) + 1);
                            console.log($scope.rating)
                        };

                        $scope.getDislike = function() {
                            var input = $(this).siblings('.qty2');
                            input.val(parseFloat(input.val()) - 1);
                        };
                    });
                }
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
                this.date = (new Date()).toLocaleString();
                this.rating = null
            }
            $scope.coment = new Coment(userObject, currentBookId, textFromInput);
            $http.post("/coments", $scope.coment).then(function(response) {
                $scope.getComents();
            })
        })
    }
}]);