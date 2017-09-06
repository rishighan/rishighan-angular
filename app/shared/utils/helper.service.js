class HelperService {
    /*@ngInject*/
    constructor() {
        this.special_char_regex = /[\W_]/g;
    }

    isTag(tags, tagname) {
        return _.contains(_.map(tags, (tag) => {
            return tag.id.toLowerCase() === tagname ? true : false;
        }), true);
    }

    createSlug(title) {
        if (title) {
            // !@#$%##$%a()*&series(&*(*of*!@#$!@unfortunate(!@#events!@#!@ ->
            // a-series-of-unfortunate-events
            let sanitizedTitle = _.filter(title.split(this.special_char_regex), function (char) {
                return char !== "";
            });
            return sanitizedTitle.length > 1 ? sanitizedTitle.join("-").toLowerCase() : sanitizedTitle.join("").toLowerCase();
        }
    }

    renameFile(filename) {
        return filename.split('.')[0] + '-' + Date.now() + '.' + filename.split('.')[filename.split('.').length - 1];
    }

    static helperFactory() {
        return new HelperService();
    }
}

export default HelperService;