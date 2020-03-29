var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'ngSanitize', 'ngclipboard', 'ngAnimate']);




myApp.config(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCHnf3VEl_k_kpgi0T5A_b3EvyuT9Hysl4",
    authDomain: "chrisspencercreative17.firebaseapp.com",
    databaseURL: "https://chrisspencercreative17.firebaseio.com",
    storageBucket: "chrisspencercreative17.appspot.com",
    messagingSenderId: "271302276044"
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
                                                $rootScope.$on('$locationChangeStart', function() {
        $rootScope.previousPage = location.href;
        console.log($rootScope.previousPage);
    });
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
        when('/portfolio/:param1', {
            templateUrl: 'views/portfolio.html',
            controller: 'PortfolioController'
        }).
        when('/services', {
            templateUrl: 'views/services.html',
            controller: 'ServicesController'
        }).
        when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        }).
        when('/news', {
            templateUrl: 'views/news.html',
            controller: 'NewsController'
        }).
        when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        }).
        when('/consult', {
            templateUrl: 'views/consult.html',
            controller: 'iFramesController'
        }).
        when('/success', {
            templateUrl: 'views/success.html'
        }).
        when('/cancelled', {
            templateUrl: 'views/cancelled.html'
        }).
        when('/test', {
            templateUrl: 'views/test.html'
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
        when('/thanks', {
            templateUrl: 'views/thanks.html'
        }).
        when('/error', {
            templateUrl: 'views/error.html'     
        }).
        otherwise({
            redirectTo: '/home'});  
}]);

myApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);
}]);

myApp.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://app.box.com/**'
    ]);
});

myApp.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        console.log('engaging trust URL');
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);




