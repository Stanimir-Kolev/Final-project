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
        userFactory.getPermisson = function () {
            return $http.get('/api/permission/');
        }
        userFactory.getUsers = function () {
            return $http.get('/api/management/')
        }
        userFactory.deleteUser = function (username) {
            return $http.delete('/api/management/' + username);
        }


        return userFactory;
    })

