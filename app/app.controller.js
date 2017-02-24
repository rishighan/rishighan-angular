class AppController {
    constructor($scope,
                NavbarService) {
        this.navItems = NavbarService.getNavItems('Home');
    }
}

export default AppController;