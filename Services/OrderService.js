(function () {
    var OrderService = function ($resource, ENV) {

        return $resource(
            ENV.apiEndpoint + 'order/view/',
            {},
            {
                get: {
                    method: 'GET',
                    isArray: true
                    
                },
               
                
            }
        )
    }

    angular.module('todoApp')
        .factory('OrderService', ['$resource', 'ENV', OrderService])
}());