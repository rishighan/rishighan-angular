class HelperService {
    /*@ngInject*/
    constructor() {

    }

    isTag(tags, tagname) {
        return _.contains(_.map(tags, (tag) => {
            return tag.id.toLowerCase() === tagname ? true : false;
        }), true);
    }

    renameFile(filename){
        return filename.split('.')[0] + '-' + Date.now() + '.' + filename.split('.')[filename.split('.').length - 1];
    }

    static helperFactory(){
        return new HelperService();
    }
}

export default HelperService;