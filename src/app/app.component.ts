import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouteConstants } from './utils/route-constants';
import { slideInAnimation } from './animations';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent {
  title = 'test-aval';
  autenticated = false;
  user: User = new User();
  displayName:any;

  constructor(private router: Router, private authService: AuthService) {

   
    this.authService.authenticated.subscribe(val => {
      this.autenticated = val;
      this.mapUser();
    });
    this.authService.mapUserInfoFromDB();
  }

  mapUser() {
    if (this.autenticated) {
      this.user = this.authService.user.user;
      this.displayName = this.authService.user.displayName ?  this.authService.user.displayName :this.user.displayName;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  logIn() {
    this.router.navigate([RouteConstants.LOGIN_PATH]);
  }

  register() {

    this.router.navigate([RouteConstants.SIGNIN_PATH]);
  }

  goToHome() {
    this.router.navigate([''])
  }

  logOut() {

    this.authService.logOutUser();
  }

  navigateToProfile(){
    this.router.navigate([RouteConstants.PROFILE_PATH]);
  }
}
