import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouteConstants } from './utils/route-constants';
import { slideInAnimation } from './animations';

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

  constructor(private router: Router) {
    this.autenticated = JSON.parse(localStorage.getItem('autenticated')) ? true : false;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  logIn() {
    this.router.navigate([RouteConstants.LOGIN_PATH]);
  }
  register() {

  }

  goToHome() {
    this.router.navigate([''])
  }
}
