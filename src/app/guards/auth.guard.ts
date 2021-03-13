import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public router: Router) { }
    canActivate(): boolean {


        const au = localStorage.getItem('autenticated');

        if (!au) {
            this.router.navigate(['authentication']);
            return false;
        }
        return true;
    }
}