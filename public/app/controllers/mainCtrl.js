angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $location, $timeout, $rootScope, $window, $interval) {
    var self = this;

    self.loadme = false;

    //vseki put kato ima razlichno view ... shte se izvika slednata funktciq
    $rootScope.$on('$routeChangeStart', function() {


        if (Auth.isLoggedIn()) {
            self.isLoggedIn = true;
            Auth.getUser().then(function(data) {
                self.username = data.data.username;
                self.useremail = data.data.email;
                self.loadme = true;
            })
        } else {
            self.isLoggedIn = false;
            self.username = '';
            self.loadme = true;
        }
        if ($location.hash() == '_=_') $location.hash(null);
    });

    this.facebook = function() {
        // console.log($window.location.host); //localhost:8000
        // console.log($window.location.protocol); // http:
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
    }



    this.doLogin = function(loginData) {
        self.loading = true;
        self.errorMsg = false;

        Auth.login(self.loginData).then(function(data) {
            if (data.data.success) {
                self.loading = false;
                self.successMsg = data.data.message + '...Redirecting';
                $timeout(function() {
                    $location.path('/MyBooks');
                    self.loginData = '';
                    self.successMsg = false;
                }, 2000)
            } else {
                self.loading = false;
                self.errorMsg = data.data.message;
            }
        });
    };

    this.logout = function() {
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
        }, 2000)
    };
});
