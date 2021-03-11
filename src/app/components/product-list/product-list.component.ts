import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  listProducts;
  constructor(private productService: ProductService) {
    this.listProducts = [];
    this.getProductList();
  }

  ngOnInit(): void {
  }

  getProductList() {

    this.productService.getProductService().subscribe(res => {
      this.listProducts = res;
    })
  }

}
