import angular from 'angular';
import Home from './home/home';
import Work from './work/work';
import Post from './post/post';

let componentModule = angular.module('app.components', [
  Home.name,
  Work.name,
  Post.name,
]);

export default componentModule;
