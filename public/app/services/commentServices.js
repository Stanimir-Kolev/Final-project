angular.module('commentServices', [])
    .factory('Comments', function ($http) {
        var commentFactory = {};

        commentFactory.getComments = function () {
            return $http.get('/coments');
        }
        commentFactory.deleteComment = function (id) {
            return $http.delete('/coments/' + id);
        }

        return commentFactory;
    })