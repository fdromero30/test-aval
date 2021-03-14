import { Component, OnInit } from '@angular/core';
import { ProductClientService } from 'src/app/services/productClient.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit {

  listProducts = [];
  id;

  constructor(private productsClientService: ProductClientService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.getListProducts();
    });

  }

  ngOnInit(): void {
  }
  getListProducts() {
    this.productsClientService.getClientProducts(this.id).subscribe((res: any) => {
      this.listProducts = res;
      this.listProducts.forEach(element => {
        element.value = element.cantidad * element.precio;
      });
    })
  }
}
