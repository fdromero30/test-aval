import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as firebase from "firebase";
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { Client } from '../models/client.model';


export class FirebaseErrorconstants {
    static WRONG_PASSWORD = "auth/wrong-password";
    static EXIST_DIFFERENT_CREDENTIALS =
        "auth/account-exists-with-different-credential";
    static EMAIL_ALREADY_USE = "auth/email-already-in-use";
    static USER_NOT_FOUND = "auth/user-not-found";
}


@Injectable()
export class AuthService {

    authenticated: BehaviorSubject<boolean>;
    email: any;
    user: any;
    userFromDB: any;
    supportedPopupSignInMethods = [
        firebase.default.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.default.auth.FacebookAuthProvider.PROVIDER_ID,
    ];

    constructor(private afsAuth: AngularFireAuth, private router: Router, private userService: UserService) {
        this.user = new User();
        this.authenticated = new BehaviorSubject<boolean>(false);
        this.isAuthenticated();
    }

    // ...
    isAuthenticated() {
        // Check whether the token is expired and return
        // true or false
        const aut = JSON.parse(localStorage.getItem('autenticated'));
        this.authenticated.next(aut);
        if (aut) {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    }

    /**
   * registro con email de usuario
   * @author fromero
   */
    registerUserEmail(email: string, pass: string) {
        this.email = email;
        return new Promise((resolve, reject) => {
            this.afsAuth.createUserWithEmailAndPassword(email, pass).then(
                (userData) => {
                    this.user = userData;
                    this.saveUserStorage();
                    resolve(userData);
                },
                (err) => reject(this.signInWithCredential(err))
            );
        });
    }

    /**
     * login con email
     * @author fromero
     */
    loginUserEmail(email: string, password: string) {
        this.email = email;
        return new Promise((resolve, reject) => {
            this.afsAuth.signInWithEmailAndPassword(email, password).then(
                (userData) => {
                    this.user = userData;
                    // this.saveUserStorage();
                    this.mapUserInfoFromDB();
                    resolve(userData);
                },
                (err) => reject(this.signInWithCredential(err))
            );
        });
    }

    /**
     * login en aplicacion con GOOGLE
     * @author fromero
     */
    loginUserGmail() {

        return this.loginGoogleWeb();

    }

    /**
   * implmenetacion de login para google en version web
   */
    loginGoogleWeb() {
        return new Promise((resolve, reject) => {
            this.afsAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).then(
                (userData) => {
                    this.user = userData;
                    this.mapUserInfoFromDB();
                    resolve(userData);
                },
                (err) => reject(this.signInWithCredential(err))
            );
        });
    }

    /**
   * handler para validacion de mixed multiple accounts
   * @param err
   */
    async signInWithCredential(err) {

        if (
            err.email &&
            err.credential &&
            err.code === FirebaseErrorconstants.EXIST_DIFFERENT_CREDENTIALS
        ) {
            let providers = null;
            this.afsAuth.fetchSignInMethodsForEmail(err.email).then((res) => {
                providers = res;
                const firstPopupProviderMethod = providers.find((p: any) =>
                    this.supportedPopupSignInMethods.includes(p)
                );
                if (!firstPopupProviderMethod) {
                    throw new Error(
                        `Your account is linked to a provider that isn't supported.`
                    );
                }
                const linkedProvider = this.getProvider(firstPopupProviderMethod);
                linkedProvider.setCustomParameters({ login_hint: err.email });
                let result = null;

                this.afsAuth.signInWithPopup(linkedProvider).then((res) => {
                    result = res;
                    result.user.linkWithCredential(err.credential);
                    this.user = result.user;
                    this.saveUserStorage();
                    this.router.navigate(['']);
                });
            });
        } else {
            this.handlerErrorAuth(err);
        }
    }


    /**
     *
     * @param err
     */
    handlerErrorAuth(err) {
        console.log(err);
        alert(err.message);
    }

    /**
     * log Out aplicacion
     */

    logOutUser() {
        this.authenticated.next(false);
        localStorage.clear();
        this.router.navigate(['login']);
        this.afsAuth.signOut();
        this.user = null;

    }

    /**
     * valida si el usuario  està logueado
     * @author fromero
     */
    isAuth() {
        return this.afsAuth.authState.pipe(map((auth) => auth));
    }
    /**
     *
     */
    saveUserStorage() {
        this.authenticated.next(true);
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('autenticated', 'true');
    }

    /**
     * 
     */
    mapUserInfoFromDB() {

        if (this.user && this.user.user) {
            this.userService.getUser(this.user.user.uid).subscribe((res: Client) => {

                this.userFromDB = res;
                this.user.displayName = `${res.primerNombre} ${res.segundoNombre} ${res.primerApellido} ${res.segundoApellido}`;
                this.saveUserStorage();
            })
        }

    }
    /**
     * obtiene el provider de autenticacion de firebase
     * @param providerId
     */
    getProvider(providerId) {
        switch (providerId) {
            case firebase.default.auth.GoogleAuthProvider.PROVIDER_ID:
                return new firebase.default.auth.GoogleAuthProvider();
            case firebase.default.auth.FacebookAuthProvider.PROVIDER_ID:
                return new firebase.default.auth.FacebookAuthProvider();
            default:
                throw new Error(`No provider implemented for ${providerId}`);
        }
    }
}