require('flexboxgrid.css');

class HomeController {
    constructor() {
        this.cuckoo = "shoomla";
        this.navItems = [{
            displayName: "Home",
            stateReference: "home"
        }, {
            displayName: "Work",
            stateReference: "work"
        }, {
            displayName: "Trampoline",
            stateReference: "post"
        }];
    }
}

export
default HomeController;