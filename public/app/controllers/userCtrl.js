angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User) {
        var self = this;
        this.regUser = function(regData, valid) {
            self.loading = true;
            self.errorMsg = false;
            if (valid) {
                User.create(self.regData).then(function(data) {
                    if (data.data.success) {
                        self.loading = false;
                        self.successMsg = data.data.message + '...Redirecting';
                        $timeout(function() {
                            $location.path('/');
                        }, 2000)

                    } else {
                        self.loading = false;
                        self.errorMsg = data.data.message;
                    }
                })
            } else {
                self.loading = false;
                self.errorMsg = 'Please ensure form is filled out properly';
            }
        };

        this.checkUsername = function(regData) { /// chechvame username i vrushtame podhodqshti suboshteniq

            self.checkingUsername = true;
            self.usernameMsg = false; // izchistvame vseki put kogato tazi fuktciq e dostup
            self.usernameInvalid = false;

            User.checkUsername(self.regData).then(function(data) {
                if (data.data.success) {
                    self.checkingUsername = false;
                    self.usernameInvalid = false;
                    self.usernameMsg = data.data.message;
                } else {
                    self.checkingUsername = false;
                    self.usernameInvalid = true;
                    self.usernameMsg = data.data.message;
                }
            });
        }

        this.checkEmail = function(regData) { /// chechvame email i vrushtame podhodqshti suboshteniq

            self.checkingEmail = true;
            self.emailMsg = false; // izchistvame vseki put kogato tazi fuktciq e dostup
            self.emailInvalid = false;

            User.checkEmail(self.regData).then(function(data) {
                if (data.data.success) {
                    self.checkingEmail = false;
                    self.emailInvalid = false;
                    self.emailMsg = data.data.message;
                } else {
                    self.checkingEmail = false;
                    self.emailInvalid = true;
                    self.emailMsg = data.data.message;
                }
            });
        }


    })
    // match za parolata kogato $scope.confirm == ele sa ednakvi ako ne sa ne sa
    .directive('match', function() {
        return {
            restrict: 'A', // A - attribute
            controller: function($scope) { // $scope za da dostupish front enda (data binding v angular)

                $scope.confirmed = false;

                $scope.doConfirm = function(values) {
                    values.forEach(function(x) {

                        if ($scope.confirm == x) {
                            $scope.confirmed = true;
                        } else {
                            $scope.confirmed = false;
                        }
                    })
                }
            },
            link: function(scope, element, attributes) {
                attributes.$observe('match', function() {
                    scope.matches = JSON.parse(attributes.match);
                    scope.doConfirm(scope.matches);
                });
                scope.$watch('confirm', function() {
                    scope.matches = JSON.parse(attributes.match);
                    scope.doConfirm(scope.matches);
                })
            }
        }
    })
    .controller('facebookCtrl', function($routeParams, Auth, $location, $window) {
        var self = this;
        if ($window.location.pathname == '/facebookerror') {
            self.errorMsg = 'Facebook e-mail not found in database';
        } else {
            Auth.facebook($routeParams.token)
            $location.path('/')
        }
    })
    // functionalnost za dostupvane na favourites masivite s knigi
    .controller('usrController', ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {
        // $scope.getUsers = function() {
        $http.get("/users").then(function(response) {
                $scope.users = response.data;
                console.log("aaaaa")
            })
            // }
            // $scope.getFavBooks = function() {
            //         $http.get("/userss/" + id).then(function(response) {
            //             $scope.user = response.data;
            //         })
            //     }
            // $scope.getFavForReadBook = function() {
            //     $http.get("/favBooks/").then(function(response) {
            //         $scope.books = response.data;
            //     })
            // }
            // $scope.getReadedBook = function() {
            //     var id = $routeParams.id;
            //     $http.get("/books/" + id).then(function(response) {
            //         $scope.book = response.data;
            //     })
            // }
    }]);