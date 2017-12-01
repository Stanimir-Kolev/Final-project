var app = angular.module("forumCtrl", []);
app.controller("forumController", ["Auth", "$scope", "$http", "$location", "$routeParams", function(Auth, $scope, $http, $location, $routeParams) {

    $scope.getReviews = function() {
        $http.get("/reviews").then(function(response) {
            $scope.reviews = response.data;
            console.log($scope.reviews)
        })
    }



    $scope.addReview = function() {
        if (Auth.isLoggedIn()) {
            Auth.getUser().then(function(response) {
                var currentUserObject = response.data;
                if ($scope.newReview == null) {
                    throw new Error("object is null");
                } else {
                    $scope.newReview.user = currentUserObject;
                    $http.post("/reviews", $scope.newReview).then(function(response) {
                        var mes = document.querySelector('#messageForSuccess')
                        mes.className = 'showEl';
                        setTimeout(function() {
                            $scope.newReview = null;
                            mes.className = 'hideEl';
                        }, 1000);
                    })
                }
            })
        }
    }
}])