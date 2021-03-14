import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  listProducts: Product[];
  typeUser: any;
  constructor(private productService: ProductService, private router: Router, private _modalService: NgbModal,
    private authService: AuthService) {
    this.listProducts = [];
    this.getProductList();
  }

  ngOnInit(): void {

  }


  getProductList() {

    this.productService.getProductService().subscribe((res: any) => {

      res.forEach((element: Product) => {
        this.listProducts.push(new Product(element.id, element.name, element.description, element.value, 0))
      });
      setTimeout(() => {
        this.typeUser = this.authService.typeUser;
      }, 0);
    })
  }

  buyProduct(item) {

    if (JSON.parse(localStorage.getItem('autenticated'))) {
      console.log(JSON.stringify(item))
    } else {
      alert('Debes Ingresar para realizar la compra');
      this.router.navigate(['login']);
    }
  }

}
