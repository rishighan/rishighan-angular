import PostService from './post.service';
// const ps = new PostService();

class PostController {
  constructor(PostService) {
    this.foo = PostService.read();
  }
}

export default PostController;
