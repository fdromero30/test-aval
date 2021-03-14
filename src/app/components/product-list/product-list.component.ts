import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouteConstants } from 'src/app/utils/route-constants';
import { ProductClientService } from 'src/app/services/productClient.service';
import { ProductClient } from 'src/app/models/productClient.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  listProducts: Product[];
  typeUser: any;
  constructor(private productService: ProductService, private router: Router,
    private authService: AuthService, private productClientService: ProductClientService) {
    this.listProducts = [];
    this.getProductList();
  }

  ngOnInit(): void {

  }

  /**
   * 
   */
  getProductList() {

    this.productService.getProductService().subscribe((res: any) => {

      this.listProducts = [];
      res.forEach((element: Product) => {
        this.listProducts.push(new Product(element.name, element.description, element.value, 0, element.id))
      });
      setTimeout(() => {
        this.typeUser = this.authService.typeUser;
      }, 0);
    })
  }

  /**
   * 
   * @param item 
   */
  buyProduct(item: Product) {


    if (JSON.parse(localStorage.getItem('autenticated'))) {
      const r = confirm('Esta seguro de comprar este producto');
      if (r) {
        console.log(JSON.stringify(item))
        let productClient = new ProductClient();


        productClient.ammount = item.ammount;
        productClient.clientId = this.authService.userFromDB.id;
        productClient.productId = item.id;
        productClient.id = `${productClient.productId}${productClient.clientId}${Date.now().toString()}`

        this.productClientService.buyProduct(productClient).subscribe(res => {
          alert("Compra realizada con exito");
          this.navigateToBuys();
        });
      }
    } else {
      alert('Debes Ingresar para realizar la compra');
      this.router.navigate(['login']);
    }
  }

  /**
   * 
   */
  navigateToCreateProduct() {
    this.router.navigate([RouteConstants.CREATE_PRODUCT_PATH]);
  }

  /**
   * 
   */
  editProduct(item) {
    this.router.navigate([RouteConstants.CREATE_PRODUCT_PATH], { queryParams: { id: item.id } })
  }

  /**
   * 
   */
  deleteProduct(item: Product) {
    const r = confirm('Desea eliminar el producto?');
    if (r) {
      this.productService.deleteProduct(item.id).subscribe(res => {
        alert('se ha eliminado con exito');
        this.getProductList();
      });
    }
  }


  /**
   * 
   */
  navigateToBuys() {
    this.router.navigate([RouteConstants.USER_BUYS_PATH], { queryParams: { id: this.authService.userFromDB.id } });
  }

  /**
   * 
   * @param val 
   * @param item 
   */
  changeAmmount(val, item: Product) {

    if (val === 'add') {
      item.ammount = item.ammount + 1;
    } else {
      item.ammount = item.ammount - 1;
    }
  }

}
