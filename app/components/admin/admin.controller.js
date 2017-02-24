class AdminController {
    constructor($scope, NavbarService) {
        this.navItems = NavbarService.getNavItems('admin');
        console.log(this.navItems);

    }
}
export default AdminController;