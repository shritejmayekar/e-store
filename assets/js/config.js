"use strict";
// ENV : Production Environment
// DEV_ENV: Staging/Development Environment
var app = angular.module('todoApp');
app.constant('ENV', {name: 'PROD', apiEndpoint:
"https://cors-anywhere.herokuapp.com/"+
"https://my-store-ecommerce.herokuapp.com/"
, auth_token:''}).constant('APP_VERSION',1);
