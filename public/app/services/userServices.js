angular.module('userServices', [])

    .factory('User', function ($http) {
       var userFactory = {};

        userFactory.create = function (regData) {
            return $http.post('/api/users', regData)
        }

        // User.checkusername(regData);
        userFactory.checkUsername = function (regData) {
            return $http.post('/api/checkusername', regData)
        }
        // User.checkemail(regData);
        userFactory.checkEmail = function (regData) {
            return $http.post('/api/checkemail', regData)
        }

        return userFactory;
    })
