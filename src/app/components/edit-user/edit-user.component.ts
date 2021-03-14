import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { RouteConstants } from 'src/app/utils/route-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: any;
  form: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService,
    private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  /**
   * 
   */
  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10), Validators.email]],
      primerNombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      segundoNombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      segundoApellido: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      documento: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      telefono: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]]
    });
    setTimeout(() => {
      this.buildUserInfo();
    }, 1);

  }


  /**
   * 
   */
  buildUserInfo() {

    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      this.user = this.authService.userFromDB;
      this.user.email = savedUser.user.email ? savedUser.user.email : savedUser.email;
    }

  }


  /**
   * 
   */
  saveForm() {

    this.user.telefono = typeof this.user.telefono == 'string' ? this.user.telefono : this.user.telefono.toString();
    this.userService.editUser(this.user).subscribe(
      res => {
        alert('Usuario modificado con exito');
        this.authService.mapUserInfoFromDB();
      }
    );
  }


  /**
   * 
   */
  navigateToProducts() {
    this.router.navigate([RouteConstants.PRODUCT_LIST_PATH]);
  }
}
