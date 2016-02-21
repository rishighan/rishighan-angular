class MessageUtilsService {
    /*@ngInject*/
    constructor($http, $location) {
        this._$http = $http;
        this._$location = $location;
        this._$message = {};
    }
    displaySuccess(message) {
        var msgInstance = this._$message;
        message.then(function(data){
            msgInstance = data;
            return msgInstance;
        })
    }

    getAdminNavItems(){
        return this.adminNavItems;
    }

}

export
default MessageUtilsService;