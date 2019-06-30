var app = angular.module('todoApp');

app.controller('HomeController', function ($scope, $auth, $state, ProductService,$http) {

    $scope.logout = function () {
        $auth.logout();
        localStorage.removeItem('user_email')
        $state.go('login');
    }
    $scope.productList = []
    $scope.quantity =1;
    $scope.user = localStorage.getItem('user_email') || null;
    $scope.cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
    $scope.cartItemCount = $scope.cartItem.length
    $scope.fetchProducts = function () {
        $scope.parmam = {}
        ProductService.get($scope.parmam).$promise
            .then(function (success) {
                console.log(success.results)
                $scope.productList = success.results;
            },
                function (error) {
                    alert(JSON.stringify(error.data))
                }
            )
    }
    $scope.fetchProducts();

    $scope.addToCart = function(product,quantity) {
        $scope.cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
        product['quantity'] = quantity;
        const magenicIndex =  $scope.cartItem.filter(data => (data.id == product.id));
        console.log(magenicIndex)
        if(magenicIndex !=0) {
            console.log('Already present')
        } else {
            $scope.cartItem.push(product);
            localStorage.setItem('cartItem', JSON.stringify($scope.cartItem));
            $scope.cartItemCount = $scope.cartItem.length
        }
       

    }
    $scope.deleteTodo = function(id) {
        var payload = {}
        payload['id']=id;
        ProductService.delete(payload).$promise
        .then(function (response) {
            alert('Todo list deleted !');
            $scope.fetchTodo();
          },
          function (error) {
            console.log(error);
            alert('There was an error  \n ' + JSON.stringify(error.data));

          })
    }


});