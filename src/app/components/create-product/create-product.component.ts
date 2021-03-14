import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { RouteConstants } from 'src/app/utils/route-constants';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form: FormGroup;
  product: Product;
  id: any;
  edit: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router, private productService: ProductService) {

    this.buildForm();
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id) {
      this.getProduct();
      this.edit = true;
    } else {
      this.product = new Product(null, null, null, null);
      this.edit = false;
    }

  }

  ngOnInit(): void {
  }

  getProduct() {
    this.productService.getProductById(this.id).subscribe((res: any) => {
      this.product = res;
    })
  }
  /**
   * 
   */
  buildForm() {
    this.form = this.formBuilder.group({
      nombreProducto: ['', [Validators.required, Validators.maxLength(50)]],
      productValue: ['', [Validators.required, Validators.min(1)], []]
    });
  }

  /**
   * 
   */
  saveForm() {

    if (this.edit) {
      this.editProduct();
    } else {
      this.createProduct();
    }
  }

  editProduct() {

    this.product.value = this.product.value.toString();
    this.productService.updateProduct(this.product).subscribe(res => {
      alert('se ha actualizado el producto');
      this.router.navigate([RouteConstants.PRODUCT_LIST_PATH]);
      console.log(res);
    })
  }

  createProduct() {

    this.product.value = this.product.value.toString();
    this.productService.createProduct(this.product).subscribe(res => {
      alert('se ha creado el producto');
      this.router.navigate([RouteConstants.PRODUCT_LIST_PATH]);
      console.log(res);
    })
  }

  cancel() {
    this.router.navigate([RouteConstants.PRODUCT_LIST_PATH]);
  }
}

