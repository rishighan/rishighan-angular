class ArchiveController {
    constructor(PostService, $filter){
        this.$_PostService = PostService;
        this.$_filter = $filter('groupBy');
        this.archivedPosts = {};
        this.getArchivedPosts();
    }

    setArchivedPosts(data){
        this.archivedPosts = data;
    }
    getArchivedPosts(){
        this.$_PostService.getArchivedPosts()
            .then((posts) => {
                let data = this.$_filter(posts.data, '_id.year');
                for(let key in data) {
                    data[key] = this.$_filter(data[key], '_id.month');
                }
                this.setArchivedPosts(data);
            });
    }
}

export default ArchiveController;