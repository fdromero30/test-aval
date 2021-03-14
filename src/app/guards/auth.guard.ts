import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public router: Router) { }
    canActivate(): boolean {


        const au = localStorage.getItem('autenticated');

        if (!au) {
            alert('su sesion ha expirado');
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}