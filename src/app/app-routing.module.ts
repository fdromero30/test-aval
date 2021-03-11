import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './utils/route-constants';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: RouteConstants.PRODUCT_LIST_PATH, component: ProductListComponent },
  { path: '', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
