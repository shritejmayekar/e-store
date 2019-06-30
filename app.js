var app = angular.module('todoApp', ['ui.router','satellizer','ngResource']);
app.config(function ($stateProvider,$urlRouterProvider,$authProvider,$resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;

    /**
    helper function
  */
  var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {

    var deferred = $q.defer();
    if ($auth.isAuthenticated() ) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }];
  var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');

    }
    return deferred.promise;
  }];
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'Views/login.html',
            controller: 'LoginController',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
              }
        })

        .state('register', {
            url: '/register',
            templateUrl: 'Views/register.html',
            controller: 'RegisterController',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
              }
        })

        .state('checkout', {
            url: '/checkout',
            templateUrl: 'Views/checkout.html',
            controller: 'checkOutController',
            resolve: {
                loginRequired: loginRequired
               }
        })
        .state('cart', {
          url: '/cart',
          templateUrl: 'Views/cart.html',
          controller: 'cartController',
          
      })
        .state('home', {
          url: '/home',
          templateUrl: 'Views/home.html',
          controller: 'HomeController',
          
      })
      .state('order', {
        url: '/order',
        templateUrl: 'Views/order.html',
        controller: 'OrderController',
        resolve: {
          loginRequired: loginRequired
         }
        
    })
        $urlRouterProvider.otherwise('/home');

})

