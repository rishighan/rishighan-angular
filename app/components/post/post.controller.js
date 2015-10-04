import postService from './post.service';
const ps = new postService();

class PostController {
  constructor() {
    this.foo = ps.read();
  }
}

export default PostController;
