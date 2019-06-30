var app = angular.module('todoApp');

app.controller('LoginController', function ($scope, $http, $auth, $state) {

    $scope.login = function () {

        var data = {
            "username": $scope.Username,
            "password": $scope.password
        }
        $auth.login(data).then(function (result) {
            localStorage.setItem('user_email',result.data.user);
        
            alert("Login Success");
            $state.go('home')

        },
            function (error) {
                alert(JSON.stringify(error.data))
            }
        )
    }

});