angular.module('appRoutes', ['ngRoute'])
    .config(function ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })
            .when('/MyBooks', {
                templateUrl: 'app/views/pages/MyBooks.html'
            })
            .when('/register',{
                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register' //nick name for the controller
            })
            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode({ /// za mahane na #
            enabled: true,
            requireBase: false
        })
    })

