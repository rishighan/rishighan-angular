class MessageUtilsService {
    /*@ngInject*/
    constructor($http, $location) {
        this._$http = $http;
        this._$location = $location;
        this.notificationPromise = {};
        this.notification = '';
    }

    clearNotifications(){
        this.notification = '';
    }

    getNotification(){
        return this.notification;
    }

    setNotification(message){
        this.notification = message;
    }

    // todo: figure out if we need more methods
    notify(messagePromise) {
        var _this = this;
        messagePromise.then(function(translation){
            _this.setNotification(translation);
        })
    }

}

export
default MessageUtilsService;