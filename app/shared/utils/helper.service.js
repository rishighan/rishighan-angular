class HelperService {
    /*@ngInject*/
    constructor() {

    }

    isTag(tags, tagname) {
        return _.contains(_.map(tags, (tag) => {
            return tag.id.toLowerCase() === tagname ? true : false;
        }), true);
    }

    static helperFactory(){
        return new HelperService();
    }
}

export default HelperService;