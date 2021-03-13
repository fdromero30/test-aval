import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './utils/route-constants';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {
    path: RouteConstants.PRODUCT_LIST_PATH, component: ProductListComponent, data: { animation: 'HomePage' }
  },
  {
    path: '', component: ProductListComponent, data: { animation: 'HomePage' }
  },
  {
    path: RouteConstants.LOGIN_PATH, component: LoginComponent, data: { animation: 'AboutPage' }
  }, {
    path: RouteConstants.SIGNIN_PATH, component: SigninComponent, data: { animation: 'AboutPage' }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
