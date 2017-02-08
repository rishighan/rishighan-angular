import navbarComponent from './navbar.component';
import NavbarService from './navbar.service';

let navbarModule = angular.module('navbarModule',[])
.directive('navbar', navbarComponent)
.service('NavbarService', NavbarService);

export default navbarModule;
