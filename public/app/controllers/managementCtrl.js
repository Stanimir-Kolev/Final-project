angular.module('managementController', [])

    .controller('managementCtrl', function (User, $scope) {
        var self = this;

        self.loading = true;
        self.accessDenied = true;
        self.errorMsg = false;
        self.deleteAccess = false;
        self.limit = 5;
        self.searchLimit = 0;

        function getUsers() {
            User.getUsers().then(function (data) {
                if (data.data.success) {
                    if (data.data.permission === 'admin') {

                        self.users = data.data.users;
                        self.loading = false;
                        self.accessDenied = false;
                        self.deleteAccess = true;
                    } else {
                        self.errorMsg = data.data.message;
                        self.loading = false;
                    }
                }
            });
        }
        getUsers();

        self.showMore = function (number) {
            self.showMoreError = false;
            if (number > 0) {
                self.limit = number;
            } else {
                self.showMoreError = 'Please enter a valid number';
            }
        }
        self.showAll = function () {
            self.limit = undefined;
            self.showMoreError = false;
        }
        self.deleteUser = function (username) {
            User.deleteUser(username).then(function (data) {
                if (data.data.success) {
                    getUsers();
                } else {
                    self.showMoreError = data.data.message;
                }
            })
        }
        self.search = function (searchKeyword, number) {
            if (searchKeyword) {
                if (searchKeyword.length > 0) {
                    self.limit = 0;
                    $scope.searchFilter = searchKeyword;
                    self.limit = number;
                } else {
                    $scope.searchFilter = undefined;
                    self.limit = 0;
                }
            } else {
                $scope.searchFilter = undefined;
                self.limit = 0;
            }

        };
        self.clear = function () {
            $scope.number = 'Clear';
            self.limit = 0;
            $scope.searchKeyword = undefined;
            $scope.searchFilter = undefined;
            self.showMoreError = false;
        };

        self.advancedSearch = function(searchByUsername, searchByEmail, searchByName){
            if(searchByUsername || searchByEmail || searchByName){
                $scope.advancedSearchFilter = {};
                if(searchByUsername){
                    $scope.advancedSearchFilter.username = searchByUsername;
                } 
                if(searchByEmail){
                    $scope.advancedSearchFilter.email = searchByEmail;
                }
                if(searchByName){
                    $scope.advancedSearchFilter.name = searchByName;
                }
                self.searchLimit = undefined;
            }
        };

        self.sortOrder = function(order){
            self.sort = order;
        };
    })

    .controller('commentsManagement', function (Comments) {
        var self = this;

        self.loading = true;

        function comments() {
            Comments.getComments().then(function (data) {
                self.allComments = data.data;

                self.loading = false;
            });
        };

        comments();

        self.deleteComment = function (_id) {
            Comments.deleteComment(_id).then(function (data) {
                comments();
            });
        };
    })