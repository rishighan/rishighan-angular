class NavbarService {
    constructor($http) {
        this._$http = $http;
        this.navItems = [
            {
                displayName: "Home",
                stateReference: "/"
            },
            {
                displayName: "Work",
                stateReference: "main.work"
            },
            {
                displayName: "Trampoline",
                stateReference: "main.trampoline"
            },
            {
                displayName: "Illustrations",
                stateReference: "main.illustrations"
            },
            {
                displayName: "Colophon",
                stateReference: "main.colophon"
            },
            {
                displayName: "Archive",
                stateReference: "main.archive"
            }
        ];
        this.adminNavItems = [
            {
                displayName: "Write",
                stateReference: 'admin.create'
            },
            {
                displayName: "Browse",
                stateReference: 'admin.posts'
            }];
    }

    getNavItems(type) {
        if (!_.isEmpty(this.navItems) && type.toLowerCase() === 'home') {
            return this.navItems;
        }
        else if (!_.isEmpty(this.adminNavItems) && type.toLowerCase() === 'admin') {
            return this.adminNavItems;
        }
    }

    backupData() {
        return this._$http.get('/backup')
            .then((response) => {
                return response;
            }, (error) => {
                return error;
            });
    }
}

export default NavbarService;