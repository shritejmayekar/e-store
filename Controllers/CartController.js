var app = angular.module('todoApp');

app.controller('cartController', function ($scope, $auth, $state, ProductService,$http) {

    $scope.logout = function () {
        $auth.logout();
        localStorage.removeItem('user_email')
        $state.go('login');
    }
    $scope.productList = []
    $scope.cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
    $scope.cartItemCount = $scope.cartItem.length
    $scope.user = localStorage.getItem('user_email') || null;


    $scope.getTotal = function(){
        // $scope.cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
        var total = 0;
        for(var i = 0; i < $scope.cartItem.length; i++){
            var product = $scope.cartItem[i];
            total += (product.price * product.quantity);
        }
        return total;
    }
    
    $scope.fetchTodo = function () {
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
    // $scope.fetchTodo();

    $scope.updateToCart = function(product,quantity) {
        console.log(product,quantity)
        $scope.cartItem  = JSON.parse(localStorage.getItem('cartItem')) || [];

        for(var i=0;i<$scope.cartItem.length;i++){
            if($scope.cartItem[i].id == product.id) {
                $scope.cartItem[i].quantity= quantity;
                localStorage.setItem('cartItem', JSON.stringify(  $scope.cartItem ));
                $scope.cartItemCount =   $scope.cartItem .length;
                $scope.getTotal();
                break;
            }
        }
       
    }
    $scope.removeToCart = function(cart) {
        $scope.cartItem  = JSON.parse(localStorage.getItem('cartItem')) || [];
        for(var i=0;i<$scope.cartItem.length;i++){
            if($scope.cartItem[i].id == cart.id) {
                $scope.cartItem.splice(i,1);
                localStorage.setItem('cartItem', JSON.stringify(  $scope.cartItem ));
                $scope.cartItemCount =   $scope.cartItem .length;
                break;
            }
        }

    }


});