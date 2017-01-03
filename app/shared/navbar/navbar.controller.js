class NavbarController {
    constructor($scope, AuthenticationService, $state) {
        this._authService = AuthenticationService;
        this._$state = $state;
        $scope.details = '';
        this._authService.getUserStatus().then(function(data){
           $scope.details = data;
        });
    }

    logout() {
        this._authService.logout()
            .then(() => {
                this._$state.go('login');
            });
    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }
}

export default NavbarController;
