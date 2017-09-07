class NavbarController {
    constructor($scope,
                $state,
                NavbarService,
                AuthenticationService,
                $translate,
                ngNotify) {
        this._authService = AuthenticationService;
        this._navbarService = NavbarService;
        this._$translate = $translate;
        this._ngNotify = ngNotify;
        this._$state = $state;
        this.redirectTo = '/';
        this.backupRunning = false;
        $scope.details = '';
        this._authService.getUserStatus().then(function (data) {
            $scope.details = data;
        });
    }

    isLogoPresent() {
        return this.logo;
    }

    getBackupStatus() {
        return this.backupRunning;
    }

    setBackupStatus(status) {
        this.backupRunning = status;
    }

    backupData() {
        this._navbarService.backupData()
            .then((result) => {
                this.setBackupStatus(true);
                this._ngNotify.set(this._$translate.instant('admin.database_backup_successful.message'), {
                    type: "success"
                });
            }, (error) => {
                this.setBackupStatus(false);
                this._ngNotify.set(this._$translate.instant('admin.database_backup_error.message'), {
                    type: "error"
                });
            })
            .finally(() => {
                this.setBackupStatus(false);
            });
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
