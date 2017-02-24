class NavbarService {
    constructor($http) {
        this.navItems = [
            {
                displayName: "Home",
                stateReference: "home"
            },
            {
                displayName: "Work",
                stateReference: "work"
            },
            {
                displayName: "Trampoline",
                stateReference: "trampoline"
            },
            {
                displayName: "Illustrations",
                stateReference: "illustrations"
            },
            {
                displayName: "Colophon",
                stateReference: "colophon"
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
                displayName: "Export Posts",
                stateReference: 'admin.export'

            }];
    }

    getNavItems(type) {
        if (!_.isEmpty(this.navItems) && type.toLowerCase() === 'home') {
            return this.navItems;
        }
        else if (!_.isEmpty(this.adminNavItems) && type.toLowerCase() === 'admin') {
            console.log("here");
            return this.adminNavItems;
        }
    }
}

export default NavbarService;