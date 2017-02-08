import PostService from '../post/post.service';

class WorkController {
  constructor($scope, PostService) {
    this.name = 'work';
    PostService.getPostsByTagName('Work').then(function(data){
      $scope.posts = data;
      console.log(data);
    });
  }
}

export default WorkController;
