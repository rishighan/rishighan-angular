class ColophonController {
    constructor(PostService){
        this._PostService = PostService;
        this.colophonData = {};

        this.fetchColophon();
    }

    setColophonData(data){
        this.colophonData = data;
    }

    fetchColophon(){
        this._PostService.getPostsByTagName('colophon', 1, 1)
            .then((data) => {
                this.setColophonData(data.data.docs);
            });
    }
}

export default ColophonController;