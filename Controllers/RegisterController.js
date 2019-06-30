var app = angular.module('todoApp');

app.controller('RegisterController',function($scope,$auth,$state){

    $scope.register = function(){
        var data = {
            "username":$scope.Username,
            "email":$scope.Email,
            "password":$scope.Password
        }
        $auth.signup(data).then(function(respnse){
            alert(JSON.stringify(respnse.data))
            $state.go('login')
        },
        function(error) {
            alert(JSON.stringify(error.data))
        }
        )
    }

});