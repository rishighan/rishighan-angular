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
        }, {
            type: 'textarea',
            key: 'content',
            templateOptions: {
                label: 'Content'
            }
        }];
    }
}

export
default AdminController;