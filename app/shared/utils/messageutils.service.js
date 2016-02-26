class MessageUtilsService {
    /*@ngInject*/
    constructor() {
        this.notification = null;
    }

    clearNotifications() {
        var _this = this;
        _this.notification = null;
    }

    getNotification() {
        return this.notification;
    }

    setNotification(message) {
        this.notification = message;
    }

    notify(messagePromise) {
        var _this = this;
        messagePromise.then(function(translation) {
            _this.setNotification(translation);
        });
    }

}

export
default MessageUtilsService;