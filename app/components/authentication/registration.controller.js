class RegistrationController {
    constructor($state, AuthenticationService) {
        this._authService = AuthenticationService;
        this.registerForm = {};
        this.error = false;
        this.errorMessage = {};
        this.disabled = false;
    }
//todo: getters and setters
    register() {
        // call register from service
        this._authService.register(this.registerForm.username, this.registerForm.password)
            .then(function () {
                this.disabled = false;
                this.registerForm = {};
                $state.go('login');
            })
            .catch(function (data) {
                this.error = true;
                this.errorMessage = data.err.message;
                this.disabled = false;
                this.registerForm = {};
            });
    }
}
export default RegistrationController;