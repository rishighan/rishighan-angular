import markdownComponent from './markdown.component';

let markdownModule = angular.module('markdownModule',[])
.directive('markdown', markdownComponent);

export default markdownModule;