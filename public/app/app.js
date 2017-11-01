// vsichki angular files shte importvame vsichki controlleri i tn v tozi fail
// main config file
angular.module('userApp', ['appRoutes', 'userControllers','userServices','ngAnimate','mainController','authServices','homeController']) /// taka se pravi application v angular .. [] - tova da dependansitata koito iskame da izpolzvame routes,animation i tn

// tova konfiguriura app da interseptva vsichki http requests s tozi factory koito asignva toketa kum headera
.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
})