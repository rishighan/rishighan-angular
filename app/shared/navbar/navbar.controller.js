class NavbarController {
    constructor($scope, $state, $stateParams, AuthenticationService) {
        this._authService = AuthenticationService;
        this._$state = $state;
        this.redirectTo = 'home';
        $scope.details = '';
        this._authService.getUserStatus().then(function(data){
           $scope.details = data;
        });
    }

    isLogoPresent(){
        return this.logo;
    }

    logout() {
        this._authService.logout()
            .then(() => {
                this._$state.go(this.redirectTo);
            });
    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }
}

export default NavbarController;
