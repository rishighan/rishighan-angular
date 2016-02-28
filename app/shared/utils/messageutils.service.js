class MessageUtilsService {
    /*@ngInject*/
    constructor() {
        this.notification = "";
        this.status = "";
    }


    clearNotifications() {
        this.notification = '';
    }

    getNotification() {
        return this.notification;
    }

    setNotification(message) {
        this.notification = message;
    }

    notify(messagePromise, status) {
        var _this = this;
        messagePromise.then(function(translation) {
            _this.setNotification(translation);
            _this.status = status;
        });
    }

}

export
default MessageUtilsService;