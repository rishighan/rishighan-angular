class AppController {
    constructor($scope,
                $filter,
                $translate,
                NavbarService) {
        this.navItems = NavbarService.getNavItems('Home');
        this.copyrightYearRange = {
            startYear: "2014",
            endYear: $filter('date')(Date.now(), "yyyy")
        };
    }
}

export default AppController;