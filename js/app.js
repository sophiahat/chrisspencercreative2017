var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'ngSanitize']);



myApp.config(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCpRQHpnwJDrxqBMzXQuzucHkrgqMS-D3E",
    authDomain: "brushcreekyachts16.firebaseapp.com",
    databaseURL: "https://brushcreekyachts16.firebaseio.com",
    storageBucket: "brushcreekyachts16.appspot.com",
    messagingSenderId: "218101125716"
  };
  firebase.initializeApp(config);
});

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
        if(error == "AUTH_REQUIRED") {
            $rootScope.message = 'Sorry, you must log in to access this page.';
            $location.path('/login');
        }//AUTH REQUIRED
    });// event info
}]);//run





myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'views/home.html'
        }).
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        }).
        when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        }).
        when('/portfolio', {
            templateUrl: 'views/portfolio.html',
            controller: 'PortfolioController'
        }).
        when('/services', {
            templateUrl: 'views/services.html',
            controller: 'ServicesController'
        }).
        when('/about', {
            templateUrl: 'views/about.html',
        }).
        when('/news', {
            templateUrl: 'views/news.html',
            controller: 'NewsController'
        }).
        when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        }).
        when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController',
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }//current Auth
                
            }//resolve
        }).
        otherwise({
            redirectTo: '/home'});  
}]);

myApp.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);

