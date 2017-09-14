class AdminController {
    constructor(NavbarService) {
        this.navItems = NavbarService.getNavItems('admin');
    }
}
export default AdminController;
