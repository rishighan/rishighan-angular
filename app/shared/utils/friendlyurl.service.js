class FriendlyUrlService {
    /*@ngInject*/
    constructor() {
        this.special_char_regex = /[\W_]/g;
    }

    createSlug(title){
        if(title) {
            // !@#$%##$%a()*&series(&*(*of*!@#$!@unfortunate(!@#events!@#!@ ->
            // a-series-of-unfortunate-events
            let sanitizedTitle = _.filter(title.split(this.special_char_regex), function (char) {
                return char !== "";
            });
            return sanitizedTitle.length > 1 ? sanitizedTitle.join("-").toLowerCase() : sanitizedTitle.join("").toLowerCase();
        }
    }
}

export
default FriendlyUrlService;