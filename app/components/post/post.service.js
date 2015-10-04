import postModel from '../../schemas/postSchema';

class PostService {
    constructor(postModel) {}

    read() {
        console.log(postModel);
        return "rhapsody in black and blue";
    }
}

export default PostService;