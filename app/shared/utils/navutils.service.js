class NavUtilsService {
    /*@ngInject*/
    constructor($http, $location) {
        this._$http = $http;
        this._$location = $location;
    }

    goToAllPostsPage() {
        this._$location.path('/admin/posts');
    }

}

export
default NavUtilsService;