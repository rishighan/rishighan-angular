require('flexboxgrid.css');

class HomeController {
    constructor() {

        this.navItems = [{
            displayName: "Home",
            stateReference: "home"
        }, {
            displayName: "Work",
            stateReference: "work"
        }, {
            displayName: "Trampoline",
            stateReference: "post"
        }, {
            displayName: "Admin",
            stateReference: "admin"
        }];
    }
}

export
default HomeController;