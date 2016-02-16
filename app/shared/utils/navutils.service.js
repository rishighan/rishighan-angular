class NavUtilsService {
    /*@ngInject*/
    constructor($http, $location) {
        this._$http = $http;
        this._$location = $location;

        this.adminNavItems = [{
            displayName: "Home",
            stateReference: "home"
        }, {
            displayName: "Work",
            stateReference: "work"
        }, {
            displayName: "Trampoline",
            stateReference: "post"
        }, {
            displayName: "Admin",
            stateReference: "admin"
        }];
    }

    goToAllPostsPage() {
        this._$location.path('/admin/posts');
    }

    getAdminNavItems(){
        return this.adminNavItems;
    }

}

export
default NavUtilsService;