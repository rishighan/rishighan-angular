class MessageUtilsService {
    /*@ngInject*/
    constructor() {
        this.notification = '';
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

    notify(messagePromise) {
        var _this = this;
        messagePromise.then(function(translation) {
            _this.setNotification(translation);
        })
    }

}

export
default MessageUtilsService;