class AdminController {
    constructor($scope, NavbarService) {
        this.navItems = NavbarService.getNavItems('admin');
    }
}
export default AdminController;