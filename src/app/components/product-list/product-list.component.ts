import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  listProducts: Product[];
  constructor(private productService: ProductService) {
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
    })
  }

  buyProduct(item) {
    console.log(JSON.stringify(item))
  }
}
