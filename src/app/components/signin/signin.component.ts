import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Client } from 'src/app/models/client.model';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  user: Client;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router,
    private userService: UserService, private spinner: NgxSpinnerService) {
    this.user = new Client('','','','','','');
  }

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
      phone: [''],
      firstName: ['', [Validators.required]],
      secondName: [''],
      firstLastName: ['', [Validators.required]],
      secondLastName: [''],
    });
  }

  /**
  * @author fromero
  * autenticación con google
  */
  onLoginGoogle(): void {
    this.auth
      .loginUserGmail()
      .then((_res: any) => {
        this.spinner.show();
        this.user.id = _res.user.uid;
        this.user.tipoUsuario = '1';
        this.user.primerNombre = _res.user.displayName.split(' ')[0] ? _res.user.displayName.split(' ')[0] : '';
        this.user.segundoNombre = _res.user.displayName.split(' ')[1] ? _res.user.displayName.split(' ')[1] : '';
        this.user.primerApellido = _res.user.displayName.split(' ')[2] ? _res.user.displayName.split(' ')[2] : '';
        this.user.segundoApellido = _res.user.displayName.split(' ')[3] ? _res.user.displayName.split(' ')[3] : '';
        this.user.cedula = '';
        this.userService.createUser(this.user).subscribe(_res => {

          this.auth.mapUserInfoFromDB();
          this.router.navigate(['']);
          this.spinner.hide();
        }, err => {
          console.log(err);
          this.spinner.hide();

          if(err.status == 409){
            this.auth.logOutUser();
            alert('Ya existe un usario con este correo');
          }else{
            alert('Ha ocurrido un error, vuelve a intentarlo');
          }
      
        });
      })
      .catch((err) => {
        this.spinner.hide();
        console.log("err", JSON.parse(err));
        alert('Ha ocurrido un error con el servidor de Firebase, vuelve a intentarlo');
      });
  }

  /**
   * @author fromero
   * create user manual
   */
  onSignIn() {
    this.spinner.show();
    this.auth.registerUserEmail(this.form.get('email').value, this.form.get('password').value)
      .then((res: any) => {

        this.user.id = res.user.uid;
        this.user.tipoUsuario = '1';

        this.userService.createUser(this.user).subscribe(_res => {
          this.router.navigate(['']);
          this.auth.mapUserInfoFromDB();
          this.spinner.hide();
        }, err => {
          console.log(err);
        });

      });
  }

}
