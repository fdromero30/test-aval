import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService, private spinner: NgxSpinnerService) {
    this.buildForm();
  }

  ngOnInit() { }

  /**
   * 
   */
  comeBack() {
    this.router.navigate(['authentication']);
  }

  /**
     * 
     */
  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10), Validators.email]],
      password: ['', [Validators.required], []]
    });
  }

  /**
   * login con email y password
   * @author fromero
   */
  onLogin(): void {
    this.spinner.show()
    event.preventDefault();
    this.auth
      .loginUserEmail(this.form.get('email').value, this.form.get('password').value)
      .then((_res) => {
        this.spinner.hide();
        this.router.navigate(['']);
      }).catch(_err => { this.spinner.hide() });
  }


  /**
   * @author fromero
   * autenticación con google
   */
  async onLoginGoogle() {
    await this.auth
      .loginUserGmail()
      .then((_res) => {
        debugger;
        this.auth.mapUserInfoFromDB();
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log("err", JSON.parse(err));
      });
  }

}
