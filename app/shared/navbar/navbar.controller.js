class NavbarController {
    constructor(AuthenticationService, $state) {
        this._authService = AuthenticationService;
        this._$state = $state;
    }

    logout() {
        this._authService.logout()
            .then(() => {
                this._$state.go('login');
            });
    };

    isLoggedIn(){
        return this._authService.isLoggedIn();
    }
}

export default NavbarController;
