class NavbarController {
    constructor(AuthenticationService, $state) {
        this.name = 'navbar';
        this._authService = AuthenticationService;
        this._$state = $state;
        this.userStatus = AuthenticationService.isLoggedIn();
    }

    logout() {
        this._authService.logout()
            .then(() => {
                this._$state.go('login');
            });
    };
}

export default NavbarController;
