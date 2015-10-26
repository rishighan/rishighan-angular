class AdminController {
    constructor($scope) {
        this.gatirodhak = 'Ibn Batuta';


        this.postFormModel = {};
        this.postFormFields = [{
            type: 'input',
            key: 'postTitle',
            templateOptions: {
                label: 'Title'
            }
        }];
    }
}

export
default AdminController;