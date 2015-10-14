var flexboxGrid = require('flexboxgrid');

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
        }]
    }
}

export
default HomeController;