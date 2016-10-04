class NavUtilsService {
    /*@ngInject*/
    constructor($http, $location) {
        this._$http = $http;
        this._$location = $location;

        this.adminNavItems = [
            {
                displayName: "Write",
                stateReference: 'admin'
            },
            {
                displayName: "Posts",
                stateReference: 'posts'
            }];
    }

    getAdminNavItems() {
        return this.adminNavItems;
    }

}

export
default NavUtilsService;