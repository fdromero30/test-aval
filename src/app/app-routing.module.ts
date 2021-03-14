import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './utils/route-constants';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AuthGuardService } from './guards/auth.guard';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UserProductsComponent } from './components/user-products/user-products.component';

const routes: Routes = [
  {
    path: RouteConstants.PRODUCT_LIST_PATH, component: ProductListComponent, data: { animation: 'HomePage' }
  },
  {
    path: '', component: ProductListComponent, data: { animation: 'HomePage' }
  },
  {
    path: RouteConstants.LOGIN_PATH, component: LoginComponent, data: { animation: 'AboutPage' }
  },
  {
    path: RouteConstants.SIGNIN_PATH, component: SigninComponent, data: { animation: 'AboutPage' }
  },
  {
    path: RouteConstants.PROFILE_PATH, component: EditUserComponent, data: { animation: 'AboutPage' }, canActivate: [AuthGuardService]
  },
  {
    path: RouteConstants.CREATE_PRODUCT_PATH, component: CreateProductComponent, data: { animation: 'AboutPage' }, canActivate: [AuthGuardService]
  },
  {
    path: RouteConstants.USER_BUYS_PATH, component: UserProductsComponent, data: { animation: 'AboutPage' }, canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
