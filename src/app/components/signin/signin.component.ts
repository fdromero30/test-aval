import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  /**
    * 
    */
  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),], []],
      copyPassword: ['', [Validators.required, Validators.minLength(6),], []],
      documentUser: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });

    this.form.valueChanges
      .pipe(debounceTime(500)).subscribe(val => {
        console.log(val);
      });
  }

  /**
  * @author fromero
  * autenticación con google
  */
  onLoginGoogle(): void {
    this.auth
      .loginUserGmail()
      .then((res) => {
        console.log(res);
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log("err", JSON.parse(err));
      });
  }

  /**
   * @author fromero
   * create user manual
   */
  onSignIn() {

    this.auth.registerUserEmail(this.form.get('email').value, this.form.get('password').value)
      .then((res) => {
        console.log(res, "succesfylly Register!");
        this.router.navigate(['']);
      });
  }

}
