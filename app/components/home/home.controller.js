require('../../../node_modules/flexboxgrid/dist/flexboxgrid.css');

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
            displayName: "Post",
            stateReference: "post"
        }];
    }
}

export
default HomeController;