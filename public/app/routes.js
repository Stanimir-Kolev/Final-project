var app = angular.module('appRoutes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html',
                controller: 'bookController'
            })
            .when('/MyBooks', {
                templateUrl: 'app/views/pages/MyBooks.html',
                authenticated: true
            })
            .when('/register', {
                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register', //nick name for the controller
                authenticated: false
            })
            .when('/login', {
                templateUrl: 'app/views/pages/users/login.html',
                authenticated: false
            })
            .when('/logout', {
                templateUrl: 'app/views/pages/users/logout.html',
                authenticated: false
            })

            .when('/profile', {
                templateUrl: 'app/views/pages/users/profile.html',
                authenticated: true,
            })
            .when('/facebook/:token', {
                templateUrl: 'app/views/pages/users/social/social.html',
                controller: 'facebookCtrl',
                controllerAs: 'facebook',
                authenticated: false
            })
            .when('/facebookerror', {
                templateUrl: 'app/views/pages/users/login.html',
                controller: 'facebookCtrl',
                controllerAs: 'facebook',
                authenticated: false
            })

            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode({ /// za mahane na #
            enabled: true,
            requireBase: false
        })
    })

app.run(['$rootScope', 'Auth', '$location', function ($rootScope, Auth, $location) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        console.log(next.$$route.authenticated); //current route 
        if (next.$$route.authenticated == true) {
            if (!Auth.isLoggedIn()) {
                event.preventDefault();    // kogato napishat naprimer http://localhost:8000/profile bez tova shte si otidat tam ... tova ne mu pozvolqva ako ne e lognat
                $location.path('/login');
            }
        } else if (next.$$route.authenticated == false) {
            if (Auth.isLoggedIn()) {
                event.preventDefault();
                $location.path('/profile'); // kogat osi lognat ne mojesh da napishesh v url-a /register --> redirectva te v /profile
            }
        }
    });
}]);