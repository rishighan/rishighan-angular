import postComponent from './post.component';
import mastheadComponent from './masthead.component';
import postService from './post.service';

let postModule = angular.module('post', [])

.directive('post', postComponent)
.directive('masthead', mastheadComponent)
.service('PostService', postService);

export default postModule;