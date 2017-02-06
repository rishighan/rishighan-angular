import PostService from './post.service';

// TODO: hook up the post create/edit form here
// Call service methods to insert/update
 function PostController ($scope, $stateParams, PostService){
     PostService.getPost($stateParams.id, $stateParams.slug).then(function(data){
         console.log(data);
     });
 }



export
default PostController;