class NavbarService {
    constructor($http) {
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
            },
            {
                displayName: "Export Data",
                stateReference: 'admin.export'

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
}

export default NavbarService;