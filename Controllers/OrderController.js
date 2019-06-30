var app = angular.module('todoApp');

app.controller('OrderController', function ($scope, $auth, $state, OrderService,$http) {

    $scope.logout = function () {
        $auth.logout();
        localStorage.removeItem('user_email')
        $state.go('login');
    }
    $scope.placeOrderNumber = undefined
    $scope.productList = []
    $scope.cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
    $scope.cartItemCount = $scope.cartItem.length
    $scope.user = localStorage.getItem('user_email') || null;

    $scope.fetchorder = function () {
        // $scope.parmam = {}
        $scope.productList = []
        OrderService.get().$promise
            .then(function (success) {
                // console.log(success)
                $scope.productList = success

                console.log($scope.productList)
            },
                function (error) {
                    alert(JSON.stringify(error.data))
                }
            )
    }
    $scope.fetchorder();

    $scope.getTotal = function(){
        // $scope.cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
        var total = 0;
        for(var i = 0; i < $scope.cartItem.length; i++){
            var product = $scope.cartItem[i];
            total += (product.price * product.quantity);
        }
        return total;
    }
    $scope.showForm = true;
    //"order":{"firstname":"shame","lastname":"bakshi","city":"Thane","postal_code":"421503","address":"sham nagar chwa","email":"shritej@sendd.co"}
    $scope.placeOrder = function () {
        $scope.payload = {}
        $scope.order = {}
        $scope.payload['firstname'] = $scope.firstname;
        $scope.payload['lastname'] = $scope.lastname;
        $scope.payload['city'] = $scope.city;
        $scope.payload['postal_code'] = $scope.postal_code;
        $scope.payload['address'] = $scope.address;
        $scope.payload['email'] = $scope.email;

        $scope.order['order'] = $scope.payload;
        $scope.cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
        if($scope.cartItem.length > 0) {
            $scope.order['cart'] = $scope.cartItem;
            localStorage.removeItem('cartItem');
            $scope.cartItem  = [];
            $scope.cartItemCount =   $scope.cartItem .length;
            OrderService.save($scope.order).$promise
            .then(function (success) {
                console.log(success)
                $scope.initialise()
                $scope.showForm = false;
                $scope.placeOrderNumber = success.order_no
            },
                function (error) {
                    alert(JSON.stringify(error.data))
                    $scope.initialise();
                }
            )        } else {
            alert('Cart is Empty')
        }

        console.log($scope.order)


    }
    $scope.initialise = function(){
        $scope.firstname=undefined;
        $scope.lastname=undefined;
        $scope.city=undefined;
        $scope.postal_code=undefined;
        $scope.address=undefined;
        $scope.email=undefined;

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