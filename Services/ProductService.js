(function () {
    var ProductService = function ($resource, ENV) {

        return $resource(
            ENV.apiEndpoint + 'product/',
            {},
            {
                get: {
                    method: 'GET',
                    
                },
                save: {
                    url: ENV.apiEndpoint + 'order/create/',
                    method: 'POST',
                },
                getOrder: {
                    url: ENV.apiEndpoint + 'order/view/',
                    method: 'GET',
                    array:true
                },
                
            }
        )
    }

    angular.module('todoApp')
        .factory('ProductService', ['$resource', 'ENV', ProductService])
}());